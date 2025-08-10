'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Financeiro</CardTitle>
          <CardDescription>
            Controle o fluxo de caixa, despesas e receitas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>O conteúdo da seção financeira aparecerá aqui em breve.</p>
        </CardContent>
      </Card>
    </div>
  );
}
