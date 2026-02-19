"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // 🛰️ Import our context hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VenetianMask } from 'lucide-react';
import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('@/components/admin/auth'), { 
  ssr: false 
});

export default function LoginPage() {
  const { user, loading } = useAuth(); // 📡 Get auth state
  const router = useRouter();

  useEffect(() => {
    // 🛡️ If loading is done and a user is already logged in, redirect them!
    if (!loading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  // While checking the status, we can show a simple loading state ⏳
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-bold animate-pulse uppercase">Checking session...</p>
      </div>
    );
  }

  // If no user is found, show the login card as usual
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <VenetianMask className="h-10 w-10 text-primary border-2 border-black p-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
          </div>
          <CardTitle className="font-headline text-2xl font-black uppercase">Admin Panel</CardTitle>
          <CardDescription>
            Sign in with Google or Email to access the secure dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Auth />
        </CardContent>
      </Card>
    </div>
  );
}