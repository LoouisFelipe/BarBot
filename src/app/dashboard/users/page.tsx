'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>
            Crie, edite e gerencie os usuários e suas permissões no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A ferramenta para criar novos usuários e gerenciar os existentes aparecerá aqui em breve.</p>
          {/* TODO: Implementar a chamada para a Firebase Function createUserWithRole */}
        </CardContent>
      </Card>
    </div>
  );
}
