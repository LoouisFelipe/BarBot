'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function VendaRapidaPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Venda Rápida</CardTitle>
          <CardDescription>
            Utilize esta tela para registrar vendas de balcão de forma ágil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>O conteúdo da venda rápida aparecerá aqui em breve.</p>
          {/* TODO: Implementar a interface de Venda Rápida */}
        </CardContent>
      </Card>
    </div>
  );
}
