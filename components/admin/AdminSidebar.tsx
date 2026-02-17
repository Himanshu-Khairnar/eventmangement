'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VenetianMask, LayoutDashboard, PlusCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events/new', label: 'New Event', icon: PlusCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-background border-r flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
            <VenetianMask className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">CampusConnect</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
                <span
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                    pathname === item.href && 'bg-primary/10 text-primary'
                )}
                >
                <item.icon className="h-5 w-5" />
                {item.label}
                </span>
            </Link>
            ))}
      </nav>
      <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
            </Link>
          </Button>
      </div>
    </aside>
  );
}
