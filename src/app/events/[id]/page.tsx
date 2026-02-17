import { getEventById, getEvents } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight, ChevronLeft, CheckCircle2, AlertCircle, Award, BookOpen, ListChecks, Package, DollarSign, Phone } from 'lucide-react';
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
            href="/events" 
            className="inline-flex items-center text-sm font-bold text-black border-2 border-transparent hover:border-black transition-all mb-8 group px-3 py-1"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to events
          </Link>

          <div className="relative aspect-[21/9] w-full mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <Image
              src={event.image || `https://picsum.photos/seed/${event.id}/1200/600`}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
            {/* Removed gradient overlay */}
            
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-white text-black text-lg px-4 py-1.5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {event.category}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight uppercase">
                  {event.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-black italic font-medium">
                  <span>Organized by <span className="text-primary font-bold">{event.committee}</span></span>
                </div>
              </div>

              <hr className="border-black border-4" />

              <div className="space-y-10">
                {/* About Section */}
                <section>
                  <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4">About this event</h3>
                  <p className="text-lg text-black leading-relaxed font-medium mb-4">
                    {event.description}
                  </p>
                  {event.detailedDescription && (
                    <p className="text-base text-black/80 leading-relaxed">
                      {event.detailedDescription}
                    </p>
                  )}
                </section>

                {/* Important Notice */}
                <div className="p-6 border-4 border-black bg-yellow-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg text-black font-black mb-2">Important Information</p>
                      <p className="text-base text-black">
                        Join us for an unforgettable experience. Make sure to bring your student ID card.
                        Refreshments will be provided.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                {event.prerequisites && event.prerequisites.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <BookOpen className="h-6 w-6" />
                      Prerequisites
                    </h3>
                    <ul className="space-y-3">
                      {event.prerequisites.map((prereq, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-black">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-base font-medium">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Requirements */}
                {event.requirements && event.requirements.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <ListChecks className="h-6 w-6" />
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {event.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-black">
                          <div className="h-5 w-5 border-2 border-black bg-white flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-base font-medium">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* What to Bring */}
                {event.whatToBring && event.whatToBring.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <Package className="h-6 w-6" />
                      What to Bring
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.whatToBring.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 border-4 border-black bg-white rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <div className="h-3 w-3 bg-black border-2 border-black" />
                          <span className="text-base font-bold text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Event Schedule */}
                {event.schedule && event.schedule.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <Clock className="h-6 w-6" />
                      Event Schedule
                    </h3>
                    <div className="space-y-4">
                      {event.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
                          <div className="min-w-[120px] p-2 bg-primary border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-sm font-black text-black text-center">{item.time}</p>
                          </div>
                          <p className="text-base font-bold text-black mt-1">{item.activity}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Rules & Regulations */}
                {event.rules && event.rules.length > 0 && (
                  <section className="p-6 border-4 border-black bg-red-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <h3 className="text-2xl font-black text-black mb-6 uppercase border-l-8 border-red-600 pl-4">
                      Rules & Regulations
                    </h3>
                    <ul className="space-y-3">
                      {event.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-black">
                          <div className="h-6 w-6 border-4 border-black bg-white flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none">
                            <span className="text-xs font-black">{idx + 1}</span>
                          </div>
                          <span className="text-base font-bold">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Prizes */}
                {event.prizes && event.prizes.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Prizes & Recognition
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.prizes.map((prize, idx) => (
                        <div key={idx} className="p-5 border-4 border-black bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
                          <p className="text-sm font-black text-black uppercase mb-2">{prize.position}</p>
                          <p className="text-lg font-black text-black">{prize.prize}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Benefits */}
                {event.benefits && event.benefits.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4">
                      Why Participate?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-base font-bold text-black">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Eligibility */}
                {event.eligibility && event.eligibility.length > 0 && (
                  <section className="p-6 border-4 border-black bg-blue-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <h3 className="text-xl font-black text-black mb-4 uppercase">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      {event.eligibility.map((criteria, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-black">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-base font-bold">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Contact Information */}
                {event.contactInfo && event.contactInfo.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-black mb-6 uppercase border-l-4 border-primary pl-4 flex items-center gap-2">
                      <Phone className="h-6 w-6" />
                      Contact Us
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.contactInfo.map((contact, idx) => (
                        <div key={idx} className="p-5 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
                          <p className="text-lg font-black text-black mb-2">{contact.name}</p>
                          <p className="text-sm text-black/80 font-bold">{contact.email}</p>
                          <p className="text-sm text-black/80 font-black">{contact.phone}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <aside className="sticky top-24 space-y-6">
                <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 rounded-none">
                  <CardHeader className="pb-2 border-b-4 border-black bg-primary">
                    <CardTitle className="text-lg font-black text-black uppercase">Event Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 py-4">
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Date" value={formattedDate} />
                    <DetailItem icon={<Clock className="h-4 w-4" />} label="Time" value={event.time} />
                    <DetailItem icon={<MapPin className="h-4 w-4" />} label="Venue" value={event.venue} />
                    <DetailItem icon={<Users className="h-4 w-4" />} label="Committee" value={event.committee} />
                    {event.registrationFee && (
                      <DetailItem icon={<DollarSign className="h-4 w-4" />} label="Registration Fee" value={event.registrationFee} />
                    )}
                  </CardContent>
                </Card>

                {/* Registration Requirements Summary */}
                

                <RegistrationSelector 
                  eventId={event.id} 
                  eventName={event.name}
                  minTeamSize={event.teamSize?.min}
                  maxTeamSize={event.teamSize?.max}
                  allowIndividual={event.teamSize?.allowIndividual}
                  resumeRequired={event.resumeRequired}
                />

                <p className="text-center text-xs text-black font-bold uppercase tracking-widest mt-4">
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
      <div className="mt-1 p-2 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-black/60 font-bold leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-black">{value}</p>
      </div>
    </div>
  );
}