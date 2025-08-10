'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ClientesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Clientes</CardTitle>
          <CardDescription>
            Visualize e gerencie a base de clientes do seu negócio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A lista de clientes e as opções de gerenciamento aparecerão aqui em breve.</p>
          {/* TODO: Implementar a lista de clientes e ações */}
        </CardContent>
      </Card>
    </div>
  );
}
