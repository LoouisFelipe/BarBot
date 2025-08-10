import { Timestamp } from 'firebase/firestore';

export interface Command {
  id: string;
  clientName: string;
  items: CommandItem[];
  status: 'open' | 'closed' | 'paid';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  total: number;
}

export interface CommandItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

// You can add more types as your application grows
