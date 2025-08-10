'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ClientesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Clientes</CardTitle>
          <CardDescription>
            Funcionalidade de gerenciamento de clientes para ser implementada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A tabela de clientes e as ações de gerenciamento aparecerão aqui em breve.</p>
        </CardContent>
      </Card>
    </div>
  );
}
