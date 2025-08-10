'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
          <CardDescription>
            Gere relatórios de vendas, estoque e muito mais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>As opções de relatórios aparecerão aqui em breve.</p>
        </CardContent>
      </Card>
    </div>
  );
}
