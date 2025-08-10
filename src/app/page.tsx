'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, GlassWater, Terminal } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Erro de autenticação:", error);
      let friendlyMessage = "Falha na autenticação. Verifique suas credenciais.";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        friendlyMessage = "E-mail ou senha incorretos. Por favor, tente novamente.";
      } else if (error.code === 'auth/user-not-found') {
        friendlyMessage = "Usuário não encontrado com este e-mail.";
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <GlassWater className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-wider">
              BARDOLUIS
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Acesso ao Sistema</h2>
              <p className="text-sm text-muted-foreground">
                Digite seu e-mail e senha para entrar.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
               {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive-foreground">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Erro de Acesso</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        Esqueceu sua senha?
                    </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 text-lg" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
         <div 
            className="h-full w-full bg-cover bg-center"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop')"}} 
            aria-label="Imagem de fundo de um bar moderno e aconchegante."
        />
      </div>
    </div>
  );
}
