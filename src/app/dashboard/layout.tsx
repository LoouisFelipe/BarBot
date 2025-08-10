'use client';
import { MainView } from '@/components/main-view';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainView>
      {children}
    </MainView>
  );
}
