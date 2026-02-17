'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data generator since we don't have real enrollment data yet
const dafaultData = [
  { name: 'Nexus Hackathon', total: 150 },
  { name: 'Music Fest', total: 320 },
  { name: 'Sports Day', total: 450 },
  { name: 'AI Workshop', total: 85 },
  { name: 'Guest Lecture', total: 120 },
  { name: 'Football Cup', total: 210 },
];

export default function EnrollmentChart() {
  return (
    <Card className="col-span-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle>Event Enrollments</CardTitle>
        <CardDescription>
          Overview of student registrations across recent events.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dafaultData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.split(' ')[0]} // Show only first word of event name
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '0px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
            />
            <Bar dataKey="total" fill="currentColor" radius={[0, 0, 0, 0]} className="fill-primary stroke-black stroke-2" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
