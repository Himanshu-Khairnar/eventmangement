import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/lib/definitions';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
    const formattedDate = format(new Date(event.date), "MMMM d, yyyy");

  return (
    <Link href={`/events/${event.id}`} className="h-full">
      <Card className="h-full flex flex-col hover:border-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={event.image || `https://picsum.photos/seed/${event.id}/400/200`}
              alt={event.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="event image"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-2">
          <Badge variant="outline">{event.committee}</Badge>
          <CardTitle className="font-headline text-lg line-clamp-2">{event.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground gap-2 pt-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <Badge variant="secondary">{event.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
