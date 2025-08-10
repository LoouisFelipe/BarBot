'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function FornecedoresPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Fornecedores</CardTitle>
          <CardDescription>
            Mantenha um registro dos seus fornecedores e contatos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A lista de fornecedores aparecerá aqui em breve.</p>
          {/* TODO: Implementar a lista de fornecedores */}
        </CardContent>
      </Card>
    </div>
  );
}
