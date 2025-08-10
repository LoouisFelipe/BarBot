'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Controle Financeiro</CardTitle>
          <CardDescription>
            Acompanhe o fluxo de caixa, contas a pagar e a receber.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Os dashboards e relatórios financeiros aparecerão aqui em breve.</p>
          {/* TODO: Implementar as funcionalidades do controle financeiro */}
        </CardContent>
      </Card>
    </div>
  );
}
