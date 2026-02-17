import { getEvents } from '@/lib/data';
import EventDashboard from '@/components/EventDashboard';
import Header from '@/components/Header';

export default async function Home() {
  const allEvents = await getEvents();
  const committees = [...new Set(allEvents.map(e => e.committee))];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-xl mx-auto px-4 py-12">
          <EventDashboard initialEvents={allEvents} committees={committees} />
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Your Event Manager
      </footer>
    </div>
  );
}