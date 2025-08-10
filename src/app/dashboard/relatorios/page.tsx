'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerenciais</CardTitle>
          <CardDescription>
            Gere relatórios de vendas, produtos mais vendidos, e muito mais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>As opções para geração de relatórios aparecerão aqui em breve.</p>
          {/* TODO: Implementar a geração de relatórios */}
        </CardContent>
      </Card>
    </div>
  );
}
