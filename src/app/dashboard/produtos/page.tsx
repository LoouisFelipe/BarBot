'use client';

import { TabProdutos } from '@/components/pdv/tab-produtos';

export default function ProdutosPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* 
        Integramos o componente que conterá a lógica e a UI 
        para o gerenciamento de produtos.
      */}
      <TabProdutos />
    </div>
  );
}
