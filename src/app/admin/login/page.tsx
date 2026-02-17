'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { VenetianMask } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, you'd have a proper auth system.
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid username or password.',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
             <div className="flex justify-center mb-4">
                <VenetianMask className="h-10 w-10 text-primary border-2 border-black p-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
             </div>
            <CardTitle className="font-headline text-2xl font-black uppercase">Admin Panel</CardTitle>
            <CardDescription>Enter credentials to access the dashboard. <br/> (admin/password)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-bold uppercase">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="admin" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold uppercase">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="password" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus-visible:ring-0" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full neubrutalist-btn rounded-none bg-primary text-black font-bold hover:bg-primary/90" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
