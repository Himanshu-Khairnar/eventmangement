import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/lib/definitions';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.date);
  const month = format(dateObj, "MMM");
  const day = format(dateObj, "dd");

  return (
    <Link href={`/events/${event.id}`} className="group h-full block">
      <Card className="h-full flex flex-col border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/20">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={event.image || `https://picsum.photos/seed/${event.id}/400/200`}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
          
          <div className="absolute top-3 left-3 flex flex-col items-center bg-background/90 backdrop-blur-md rounded-lg p-2 min-w-[3.5rem] shadow-lg border border-white/5">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{month}</span>
            <span className="text-xl font-extrabold text-foreground">{day}</span>
          </div>

          <div className="absolute top-3 right-3">
             <Badge variant="secondary" className="backdrop-blur-md bg-background/70 hover:bg-background/90 border-white/10 text-xs font-medium px-2 py-0.5 shadow-sm">
                {event.category}
             </Badge>
          </div>
        </div>

        <CardContent className="flex-grow p-5 space-y-4">
          <div className="space-y-1">
             <div className="text-xs font-medium text-primary tracking-wide uppercase">
                {event.committee}
             </div>
             <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {event.name}
             </h3>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground/80">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary/70" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary/70" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 mt-auto">
           <div className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>View Details</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  &rarr;
              </span>
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
