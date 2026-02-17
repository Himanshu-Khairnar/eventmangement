import { getEventById, getEvents } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Link from 'next/link';
import React from 'react';
import RegistrationSelector from '@/components/RegistrationSelector';

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map(event => ({ id: event.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();
  
  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <div className="container max-w-screen-xl mx-auto px-4 pt-8 pb-12">
          
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to events
          </Link>

          <div className="relative aspect-[21/9] w-full mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={event.image || `https://picsum.photos/seed/${event.id}/1200/600`}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-1.5 backdrop-blur-md border-none">
                {event.category}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {event.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground italic">
                  <span>Organized by <span className="text-primary font-medium">{event.committee}</span></span>
                </div>
              </div>

              <hr className="border-white/5" />

              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-semibold text-white mb-6">About this event</h3>
                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
                {/* Placeholder for more content */}
                <p className="text-lg text-muted-foreground">
                    Join us for an unforgettable experience. Make sure to bring your student ID card.
                    Refreshments will be provided.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <aside className="sticky top-24 space-y-6">
                <Card className="bg-card/50 backdrop-blur-lg border-white/5 shadow-xl mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-white">Event Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 py-4">
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Date" value={formattedDate} />
                    <DetailItem icon={<Clock className="h-4 w-4" />} label="Time" value={event.time} />
                    <DetailItem icon={<MapPin className="h-4 w-4" />} label="Venue" value={event.venue} />
                    <DetailItem icon={<Users className="h-4 w-4" />} label="Committee" value={event.committee} />
                  </CardContent>
                </Card>

                <RegistrationSelector eventId={event.id} eventName={event.name} />
                
                <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mt-4">
                  Limited slots available
                </p>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}