import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, VenetianMask } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <VenetianMask className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">CampusConnect</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/calendar">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Calendar</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/login">
              <User className="mr-2 h-5 w-5" />
              Admin
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
