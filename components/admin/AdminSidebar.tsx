'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';
import { VenetianMask, LayoutDashboard, PlusCircle, ArrowLeft, Users, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/participation', label: 'Participation Details', icon: Users },
  { href: '/admin/events/new', label: 'New Event', icon: PlusCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-64 h-screen sticky top-0 bg-background border-r flex flex-col transition-colors duration-300">
      <div
        className="p-4 border-b flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors group"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title="Toggle Theme"
      >
        <VenetianMask className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
        <div className="flex flex-col">
          <span className="font-headline text-2xl font-bold leading-none">CampusConnect</span>
          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
            {mounted ? (
              <>
                {theme === 'dark' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </span>
        </div>
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
        <Button variant="outline" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
        </Button>
      </div>
    </aside>
  );
}
