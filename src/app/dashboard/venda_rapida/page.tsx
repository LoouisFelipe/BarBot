'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function VendaRapidaPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Venda Rápida</CardTitle>
          <CardDescription>
            Funcionalidade de venda rápida para ser implementada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>O conteúdo da venda rápida aparecerá aqui em breve.</p>
        </CardContent>
      </Card>
    </div>
  );
}
