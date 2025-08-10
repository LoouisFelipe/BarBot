'use client';

import { TabComandas } from '@/components/pdv/tab-comandas';

export default function ComandasPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* 
        Aqui integramos o componente que contém a lógica e a UI 
        específica para o gerenciamento de comandas.
      */}
      <TabComandas loading={false} />
    </div>
  );
}
