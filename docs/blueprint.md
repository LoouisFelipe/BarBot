# AI-Powered POS System Blueprint

## Core Technologies

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Firebase (Firestore)
- **AI Integration**: Genkit

## Data Structure (`/lib/types.ts`)

- **Product**: Manages products, with support for unit sales, dose sales, and manual price entry.
- **DoseOption**: Defines different dose sizes and prices for products sold by dose.
- **Customer**: Stores customer data, including balance, credit, and friends list.
- **Command**: Represents a customer's order, linking items, customer, and total value.
- **CommandItem**: Details of each item within an order.
- **Transaction**: Records all financial movements (sales, expenses, payments).
- **AppUser**: Manages system users and their access levels (admin, cashier, waiter).
- **FixedExpense**: For recurring expenses like rent and salaries.
- **Supplier**: Registers product suppliers.

## Main Features (`/components/features/`)

### 1. **Commands (`/commands`)**
- **`commands-tab.tsx`**: Main interface for managing open orders.
- **`add-items-modal.tsx`**: Modal for adding products to an order.
- **`payment-modal.tsx`**: Handles payment processing, with options for cash, card, PIX, and credit.
- **`split-bill-modal.tsx`**: Allows splitting the bill equally or by item.

### 2. **Customers (`/customers`)**
- **`customers-tab.tsx`**: Lists all customers and allows for searching and filtering.
- **`customer-form-modal.tsx`**: Form for adding and editing customer information.
- **`customer-payment-modal.tsx`**: Modal for settling customer debts.
- **`add-credit-modal.tsx`**: Allows adding prepaid credit to a customer's account.

### 3. **Dashboard (`/dashboard`)**
- **`manager-dashboard.tsx`**: Dashboard for the administrator, with sales summaries, charts, and alerts.
- **`cashier-dashboard.tsx`**: Simplified view for the cashier, focused on opening/closing the register.
- **`waiter-dashboard.tsx`**: View for waiters, showing open orders.

### 4. **Finance (`/finance`)**
- **`finance-tab.tsx`**: Complete financial overview, with cash flow, expense reports, and profitability analysis.
- **`abrir-caixa-modal.tsx` / `fechamento-caixa-modal.tsx`**: Modals for opening and closing the cash register.
- **`recurring-costs-manager.tsx`**: Manages recurring expense templates.

### 5. **Products (`/products`)**
- **`products-tab.tsx`**: Interface for viewing and managing all registered products.
- **`product-form-modal.tsx`**: Form for adding and editing products.
- **`stock-modal.tsx`**: Modal for adding stock to existing products.

### 6. **Quick Sale (`/quick-sale`)**
- **`quick-sale-tab.tsx`**: Simplified interface for over-the-counter sales, using a single, reusable order.

### 7. **Suppliers (`/suppliers`)**
- **`suppliers-tab.tsx`**: Manages the list of suppliers.
- **`purchase-modal.tsx`**: Modal for registering purchases from suppliers and updating stock.

### 8. **Users (`/users`)**
- **`users-tab.tsx`**: Manages system users and their permissions.
- **`user-form-modal.tsx`**: Form for adding and editing users.

## AI Integration (`/ai/flows/`)

- **`birthday-greeter.ts`**: Generates creative birthday messages for customers.
- **`customer-analysis.ts`**: Analyzes a customer's purchase history to identify preferences and suggest sales strategies.
- **`sales-data-analyzer.ts`**: (Future Implementation) Will analyze sales data to identify trends and opportunities.
