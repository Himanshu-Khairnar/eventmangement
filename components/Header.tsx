import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, VenetianMask } from 'lucide-react';

export default function Header() {
  return (
    // Added border-b-4 and a solid black shadow (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)])
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white px-10">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        
        {/* Logo Section */}
        <Link href="/events" className="flex items-center gap-2 group">
          <div className="p-1 border-2 border-black bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
            <VenetianMask className="h-6 w-6 text-black" />
          </div>
          <span className="font-headline text-2xl font-black uppercase tracking-tighter">
            CampusConnect
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="border-2 border-black rounded-none bg-primary hover:bg-white hover:text-black border-2 border-black text-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <Link href="/calendar">
              <Calendar className="h-5 w-5 text-black" />
              <span className="sr-only">Calendar</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            asChild 
            className="border-2 border-black rounded-none bg-primary hover:bg-white hover:text-black border-2 border-black text-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <Link href="/admin/login">
              Admin
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}