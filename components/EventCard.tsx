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
      <Card className="h-full flex flex-col neubrutalist-card rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-black">
          <Image
            src={event.image || `https://picsum.photos/seed/${event.id}/400/200`}
            alt={event.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Removed gradient overlay for raw look */}
          
          <div className="absolute top-3 left-3 flex flex-col items-center bg-background border-2 border-black p-2 min-w-[3.5rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-bold text-black uppercase tracking-wider">{month}</span>
            <span className="text-xl font-extrabold text-black">{day}</span>
          </div>

          <div className="absolute top-3 right-3">
             <Badge variant="secondary" className="bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-white">
                {event.category}
             </Badge>
          </div>
        </div>

        <CardContent className="flex-grow p-5 space-y-4 bg-white text-black">
          <div className="space-y-1">
             <div className="text-xs font-bold text-primary tracking-wide uppercase">
                {event.committee}
             </div>
             <h3 className="text-xl font-black leading-tight border-b-2 border-transparent group-hover:border-primary w-fit transition-colors line-clamp-2">
                {event.name}
             </h3>
          </div>

          <div className="space-y-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-black" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-black" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 mt-auto bg-white">
           <div className="w-full pt-4 border-t-2 border-black flex items-center justify-between text-xs text-black font-bold uppercase">
              <span>View Details</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
              </span>
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
