'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Spinner } from '@/components/pdv/spinner';
import {
  Menu,
  GlassWater,
  UserCog,
  ClipboardList,
  Package,
  Users,
  History,
  BarChart2,
  Truck,
  Zap,
  LogOut,
} from 'lucide-react';

const navLinks = [
  { href: '/dashboard/comandas', label: 'Comandas', icon: ClipboardList, roles: ['admin', 'caixa', 'garcom'] },
  { href: '/dashboard/venda_rapida', label: 'Venda Rápida', icon: Zap, roles: ['admin', 'caixa'] },
  { href: '/dashboard/produtos', label: 'Produtos', icon: Package, roles: ['admin'] },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users, roles: ['admin'] },
  { href: '/dashboard/fornecedores', label: 'Fornecedores', icon: Truck, roles: ['admin'] },
  { href: '/dashboard/financeiro', label: 'Financeiro', icon: History, roles: ['admin'] },
  { href: '/dashboard/relatorios', label: 'Relatórios', icon: BarChart2, roles: ['admin'] },
  { href: '/dashboard/users', label: 'Usuários', icon: UserCog, roles: ['admin'] },
];

function NavContent({ role, currentPath, onLogout }: { role: string; currentPath: string, onLogout: () => void }) {
  const permittedLinks = useMemo(() => {
    return navLinks.filter(link => link.roles.includes(role));
  }, [role]);

  return (
    <nav className="flex flex-col gap-2 p-4 h-full">
       <Link href="/dashboard" className="flex items-center gap-3 mb-6 px-2 pt-2">
          <GlassWater className="text-primary h-7 w-7" />
          <h1 className="text-xl font-bold tracking-wider">BARDOLUIS</h1>
      </Link>
      <div className="flex flex-col gap-2 flex-grow">
        {permittedLinks.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href}>
            <div
              className={`flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${currentPath.startsWith(href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mr-4" />
              <span className="font-semibold">{label}</span>
            </div>
          </Link>
        ))}
      </div>
      <Button onClick={onLogout} variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-500 mt-auto">
        <LogOut className="mr-4 h-5 w-5" />
        Sair
      </Button>
    </nav>
  );
}


export function MainView({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, isAuthReady } = useAuth();
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/'); 
  };

  if (!isAuthReady || !user || !role) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Spinner />
        <p className="mt-4 text-muted-foreground">Autenticando e carregando...</p>
      </div>
    );
  }

  const currentPage = navLinks.find(link => pathname.startsWith(link.href));

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_1fr] bg-muted/40">
      <aside className="hidden border-r bg-background md:block">
        <NavContent role={role} currentPath={pathname} onLogout={handleLogout} />
      </aside>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu de navegação</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 bg-background border-r">
              <NavContent role={role} currentPath={pathname} onLogout={handleLogout}/>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
             <h1 className="font-semibold text-lg">{currentPage?.label || 'Dashboard'}</h1>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
}
