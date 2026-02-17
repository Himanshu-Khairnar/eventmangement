import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Zap, Globe, ArrowUpRight, Sparkles, Command } from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 overflow-x-hidden">
      <Header />

      {/* Floating Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24">
        
        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center text-center mb-24">
          <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-subtle bg-white/5 backdrop-blur-xl scale-95 hover:scale-100 transition-transform cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-100/60">
              The Next Gen Campus Hub
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tightest leading-[0.85] mb-8">
            ORGANIZE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              WITHOUT LIMITS.
            </span>
          </h1>

          <p className="max-w-xl text-emerald-100/50 text-lg md:text-xl font-medium mb-10 leading-relaxed">
            The infrastructure for high-performance student committees. 
            Automate discovery. Amplify engagement.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
            <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary-hover text-black font-bold shadow-glow transition-all active:scale-95">
              Get Started
            </Button>
            </Link>
            <Button variant="outline" className="h-14 px-10 rounded-full border-border-subtle bg-white/5 hover:bg-white/10 backdrop-blur-md font-bold transition-all">
              Live Demo
            </Button>
          </div>
        </section>

        {/* --- Bento Grid Layout --- */}
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          
          {/* Main Feature: 8 cols, 2 rows */}
          <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-bento border border-border-subtle bg-card p-10 shadow-inner-glow">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Zap className="text-primary w-6 h-6 fill-primary/20" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Real-time <br />Committee Intelligence.</h2>
                <p className="text-emerald-100/40 max-w-sm text-lg font-medium">
                  Track every RSVP, ticket scan, and engagement metric in one unified dashboard.
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-1 w-24 rounded-full bg-primary/40" />
                 <span className="text-xs font-mono text-primary uppercase">Active Tracking Enabled</span>
              </div>
            </div>
            {/* Background Decorative Mesh */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
          </div>

          {/* Side Feature 1: 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 rounded-bento border border-border-subtle bg-white/[0.02] p-8 flex flex-col justify-center hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center gap-4 mb-2">
                <Globe className="text-primary w-6 h-6" />
                <h3 className="text-xl font-bold">Global Sync</h3>
            </div>
            <p className="text-sm text-emerald-100/30">Connect to every student calendar ecosystem seamlessly.</p>
          </div>

          {/* Side Feature 2 (CTA): 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 rounded-bento bg-primary p-8 flex flex-col justify-between group cursor-pointer hover:-rotate-1 transition-all">
            <h3 className="text-2xl font-black text-black leading-tight">Empower <br />Your Team.</h3>
            <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
          </div>

          {/* Small Feature 1: 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 rounded-bento border border-border-subtle bg-white/[0.02] p-8 flex items-center gap-6">
            <Users className="text-primary w-10 h-10 shrink-0" />
            <div>
                <h4 className="font-bold text-lg leading-tight">10k+</h4>
                <p className="text-xs text-emerald-100/30 font-medium">Active Students</p>
            </div>
          </div>

          {/* Small Feature 2: 8 cols, 1 row */}
          <div className="md:col-span-8 md:row-span-1 rounded-bento border border-border-subtle bg-gradient-to-r from-white/[0.02] to-transparent p-8 flex items-center justify-between">
            <div className="space-y-1">
                <h4 className="text-xl font-bold">Secure Infrastructure</h4>
                <p className="text-sm text-emerald-100/30">Enterprise-grade data protection for campus data.</p>
            </div>
            <Command className="w-8 h-8 text-white/10" />
          </div>

        </div>

        <footer className="mt-32 py-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center opacity-40">
           <div className="flex items-center gap-2 font-black text-lg">
             <div className="w-6 h-6 rounded bg-primary" /> CAMPUS_V2
           </div>
           <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase">
             <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
             <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
             <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
           </div>
        </footer>
      </main>
    </div>
  );
}