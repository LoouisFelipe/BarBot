# Sistema de Ponto de Venda (PDV) com Next.js e Firebase

Este é um projeto de sistema de Ponto de Venda (PDV) completo, construído com Next.js e Firebase. Ele foi projetado como um kit inicial para uma aplicação do mundo real e vem com um rico conjunto de funcionalidades prontas para uso.

## ✨ Funcionalidades

O sistema oferece uma gama de funcionalidades para otimizar a gestão de um estabelecimento comercial, organizadas nas seguintes categorias:

#### 📊 Gestão e Cadastros
*   **Produtos:** Gerencie seu catálogo, controle os níveis de estoque e adicione novos itens facilmente.
*   **Clientes:** Mantenha um cadastro completo, visualize o histórico de compras e gerencie créditos.
*   **Fornecedores:** Cadastre parceiros, mantenha informações de contato e registre compras de insumos.
*   **Usuários:** Administre as contas e as permissões de acesso ao sistema.
*   **Custos:** Gerencie custos recorrentes para uma visão financeira precisa.

#### 📈 Operacional e Vendas
*   **Painel de Controle (Dashboard):** Hub central com visões personalizadas para Gerentes, Caixas e Garçons.
*   **Gestão de Comandas:** Crie, edite, adicione itens (incluindo por peso/dose) e divida contas entre clientes.
*   **Venda Rápida:** Interface otimizada para transações ágeis no balcão.
*   **Controle de Caixa:** Funções completas para abertura, fechamento e monitoramento do fluxo de caixa diário.
*   **Processamento de Pagamentos:** Realize pagamentos de forma integrada diretamente pela comanda ou pelo perfil do cliente.

#### 🧠 Análise e Inteligência Artificial
*   **Relatórios e Gráficos:** Visualize a performance do negócio com análises de vendas e outros indicadores chave.
*   **Alertas Inteligentes:** Receba insights e alertas no painel para auxiliar na tomada de decisões.
*   **Análise de Clientes (IA):** Utilize inteligência artificial (Genkit) para analisar o perfil de consumo dos clientes.
*   **Sugestões de Presentes (IA):** Obtenha ideias de presentes de aniversário para clientes, geradas por IA, para ações de fidelização.

## 🚀 Como Começar

Para executar este projeto localmente, siga estes passos:

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:3000`.

## 📂 Estrutura do Projeto

O projeto está organizado nas seguintes pastas principais:

*   `src/app/dashboard`: Contém as páginas para cada seção do painel de controle (Clientes, Produtos, etc.).
*   `src/components/features`: Contém os componentes React que implementam cada funcionalidade do sistema (ex: `customers`, `products`).
*   `src/components/ui`: Contém componentes de UI genéricos e reutilizáveis (Botões, Modais, etc.).
*   `src/lib`: Contém funções utilitárias e a configuração do Firebase.
*   `src/ai`: Contém os fluxos de Inteligência Artificial desenvolvidos com Genkit.
*   `public`: Contém arquivos estáticos, como imagens e service workers.
