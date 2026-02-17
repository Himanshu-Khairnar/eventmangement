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
    <Card className="col-span-4">
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
                contentStyle={{ borderRadius: '8px', border: '1px solid #333', backgroundColor: '#000', color: '#fff' }}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
