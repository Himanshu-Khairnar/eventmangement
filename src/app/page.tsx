import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Zap, Globe, ArrowUpRight, Sparkles, Command } from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-yellow-300 selection:text-black overflow-x-hidden bg-white text-black">
      <Header />


      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24">
        
        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center text-center mb-24">
          <div className="mb-8 flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-default">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-black">
              The Next Gen Campus Hub
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 uppercase text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            ORGANIZE <br />
            <span className="text-white bg-black px-4">
              WITHOUT LIMITS.
            </span>
          </h1>

          <p className="max-w-xl text-black text-xl font-bold mb-10 leading-relaxed border-l-4 border-black pl-6 text-left">
            The infrastructure for high-performance student committees. 
            Automate discovery. Amplify engagement.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events">
            <Button className="h-14 px-10 rounded-none bg-primary hover:bg-white hover:text-black border-2 border-black text-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              Get Started
            </Button>
            </Link>
           
          </div>
        </section>

        {/* --- Bento Grid Layout --- */}
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          
          {/* Main Feature: 8 cols, 2 rows */}
          <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-yellow-300 flex items-center justify-center border-2 border-black">
                  <Zap className="text-black w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black tracking-tight uppercase">Real-time <br />Committee Intelligence.</h2>
                <p className="text-black font-bold max-w-sm text-lg">
                  Track every RSVP, ticket scan, and engagement metric in one unified dashboard.
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-4 w-24 bg-black" />
                 <span className="text-xs font-mono text-black uppercase font-bold">Active Tracking Enabled</span>
              </div>
            </div>
          </div>

          {/* Side Feature 1: 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 bg-white border-2 border-black p-8 flex flex-col justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-200 transition-colors group">
            <div className="flex items-center gap-4 mb-2">
                <Globe className="text-black w-8 h-8" />
                <h3 className="text-xl font-black uppercase">Global Sync</h3>
            </div>
            <p className="text-sm text-black font-bold">Connect to every student calendar ecosystem seamlessly.</p>
          </div>

          {/* Side Feature 2 (CTA): 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 bg-primary border-2 border-black p-8 flex flex-col justify-between group cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/80 transition-all">
            <h3 className="text-2xl font-black text-black leading-tight uppercase">Empower <br />Your Team.</h3>
            <div className="flex justify-end">
                <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform border-2 border-white">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
          </div>

          {/* Small Feature 1: 4 cols, 1 row */}
          <div className="md:col-span-4 md:row-span-1 bg-white border-2 border-black p-8 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Users className="text-black w-10 h-10 shrink-0" />
            <div>
                <h4 className="font-black text-3xl leading-tight">10k+</h4>
                <p className="text-xs text-black font-bold uppercase">Active Students</p>
            </div>
          </div>

          {/* Small Feature 2: 8 cols, 1 row */}
          <div className="md:col-span-8 md:row-span-1 bg-black p-8 flex items-center justify-between border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-1">
                <h4 className="text-xl font-black text-white uppercase">Secure Infrastructure</h4>
                <p className="text-sm text-white/80 font-bold">Enterprise-grade data protection for campus data.</p>
            </div>
            <Command className="w-10 h-10 text-white" />
          </div>

        </div>

        <footer className="mt-32 py-12 px-10 border-t-4 border-black flex flex-col md:flex-row justify-between items-center">
           <div className="flex items-center gap-2 font-black text-2xl uppercase">
             <div className="w-8 h-8 bg-primary border-2 border-black" /> CAMPUS_V2
           </div>
           <div className="flex gap-8 text-sm font-black tracking-widest uppercase">
             <Link href="#" className="hover:underline hover:decoration-4 hover:decoration-primary transition-all">Twitter</Link>
             <Link href="#" className="hover:underline hover:decoration-4 hover:decoration-primary transition-all">GitHub</Link>
             <Link href="#" className="hover:underline hover:decoration-4 hover:decoration-primary transition-all">Contact</Link>
           </div>
        </footer>
      </main>
    </div>
  );
}