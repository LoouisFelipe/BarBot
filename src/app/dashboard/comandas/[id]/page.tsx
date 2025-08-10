'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, collection, addDoc, Timestamp, writeBatch } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Spinner } from '@/components/pdv/spinner';
import { ArrowLeft, PlusCircle } from 'lucide-react';

// Tipos
interface Comanda {
  id: string;
  cliente: string;
  status: 'Aberta' | 'Fechada' | 'Em Pagamento';
  total: number;
  data: Date;
}

interface Item {
  id: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

interface Produto {
  id: string;
  nome: string;
  preco: number;
}

const statusVariantMap: { [key in Comanda['status']]: "default" | "secondary" | "destructive" } = {
  'Aberta': 'secondary',
  'Fechada': 'default',
  'Em Pagamento': 'destructive',
};

// Schema de validação para adicionar item
const addItemSchema = z.object({
  produtoId: z.string().nonempty({ message: "Selecione um produto." }),
  quantidade: z.coerce.number().min(1, { message: "A quantidade deve ser pelo menos 1." }),
});


export default function ComandaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const comandaId = params.id as string;

  const [comanda, setComanda] = useState<Comanda | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      produtoId: "",
      quantidade: 1,
    },
  });

  // Efeito para buscar todos os dados necessários em paralelo
  useEffect(() => {
    if (!comandaId) return;
    setLoading(true);

    // Função para buscar os detalhes da comanda
    const unsubComanda = onSnapshot(doc(db, "comandas", comandaId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setComanda({
          id: docSnap.id,
          cliente: data.cliente,
          status: data.status,
          total: data.total,
          data: (data.data as Timestamp).toDate(),
        });
      } else {
        setError("Comanda não encontrada.");
      }
    });

    // Função para buscar os itens da comanda
    const unsubItens = onSnapshot(collection(db, "comandas", comandaId, "itens"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
      setItems(itemsData);
    });

    // Função para buscar a lista de produtos
    const unsubProdutos = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const produtosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Produto));
      setProdutos(produtosData);
    });

    // Para o loading quando todos os dados iniciais forem potencialmente carregados
    Promise.all([
        getDoc(doc(db, "comandas", comandaId)), 
        // Adicione outras buscas iniciais se necessário
    ]).finally(() => setLoading(false));

    // Função de limpeza para cancelar todas as escutas
    return () => {
      unsubComanda();
      unsubItens();
      unsubProdutos();
    };
  }, [comandaId]);


  const handleAddItem = useCallback(async (values: z.infer<typeof addItemSchema>) => {
    if (!comandaId || comanda?.status !== 'Aberta') return;

    const selectedProduto = produtos.find(p => p.id === values.produtoId);
    if (!selectedProduto) return;

    const batch = writeBatch(db);

    const itemRef = doc(collection(db, "comandas", comandaId, "itens"));
    batch.set(itemRef, {
      nome: selectedProduto.nome,
      quantidade: values.quantidade,
      precoUnitario: selectedProduto.preco,
    });
    
    const comandaRef = doc(db, "comandas", comandaId);
    const novoTotal = (comanda.total || 0) + (selectedProduto.preco * values.quantidade);
    batch.update(comandaRef, { total: novoTotal });
    
    await batch.commit();
    form.reset();
  }, [comandaId, comanda, produtos, form]);

  if (loading) {
    return <div className="flex items-center justify-center p-8"><Spinner /><span className="ml-2 text-muted-foreground">Carregando detalhes...</span></div>;
  }
  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }
  if (!comanda) {
    return <div className="text-center p-8">Comanda não encontrada.</div>;
  }

  const totalCalculado = items.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" size="sm" className="w-fit" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Comandas
      </Button>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">Comanda: {comanda.cliente}</CardTitle>
            <CardDescription>ID: {comanda.id}</CardDescription>
          </div>
          <Badge variant={statusVariantMap[comanda.status] || 'default'} className="text-base">
            {comanda.status}
          </Badge>
        </CardHeader>

        {comanda.status === 'Aberta' && (
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddItem)} className="flex flex-col sm:flex-row items-end gap-4 p-4 border rounded-lg bg-muted/50">
                <FormField
                  control={form.control}
                  name="produtoId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Produto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um produto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {produtos.length > 0 ? (
                            produtos.map(p => <SelectItem key={p.id} value={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</SelectItem>)
                          ) : (
                            <SelectItem value="-" disabled>Nenhum produto cadastrado</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" className="w-24" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item
                </Button>
              </form>
            </Form>
          </CardContent>
        )}
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Qtd.</TableHead>
                <TableHead className="text-right">Preço Unit.</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? (
                items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nome}</TableCell>
                    <TableCell className="text-center">{item.quantidade}</TableCell>
                    <TableCell className="text-right">R$ {item.precoUnitario.toFixed(2)}</TableCell>
                    <TableCell className="text-right">R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">Nenhum item nesta comanda.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex justify-end">
          <div className="text-2xl font-bold">
              Total: R$ {totalCalculado.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
