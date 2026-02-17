'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle2, Upload } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const createFormSchema = (resumeRequired: boolean) => {
  const baseSchema = {
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    studentId: z.string().min(5, {
      message: "Student ID must be at least 5 characters.",
    }),
    year: z.string({
      required_error: "Please select your year.",
    }),
    branch: z.string().min(2, {
      message: "Branch is required (e.g. CSE, ECE).",
    }),
  };

  if (resumeRequired) {
    return z.object({
      ...baseSchema,
      resume: z.any()
        .refine((file) => file instanceof File, { message: "Resume is required." })
        .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, { message: "Resume must be less than 5MB." })
        .refine((file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type), { message: "Only PDF files are accepted." }),
    });
  }

  return z.object(baseSchema);
};

export default function RegistrationForm({
  eventId,
  eventName,
  resumeRequired = false
}: {
  eventId: string;
  eventName: string;
  resumeRequired?: boolean;
}) {
  const formSchema = createFormSchema(resumeRequired);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  type RegistrationFormData = {
    name: string;
    email: string;
    studentId: string;
    year: string;
    branch: string;
    resume?: File;
  };

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      branch: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <Card className="bg-green-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 bg-black flex items-center justify-center text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0)]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-black uppercase text-black">Registration Successful!</CardTitle>
            <CardDescription className="mt-2 text-black font-medium">
              You have successfully registered for <strong>{eventName}</strong>.
              <br />
              Check your email for the ticket.
            </CardDescription>
          </div>
          <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 neubrutalist-btn bg-white hover:bg-white text-black hover:text-black">
            Register Another Student
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
      <CardHeader className="border-b-2 border-black bg-yellow-300">
        <CardTitle className="font-black uppercase text-black">Register for Event</CardTitle>
        <CardDescription className="text-black font-bold text-opacity-80">Secure your spot for {eventName}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-bold uppercase text-xs">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all placeholder:text-black/30 font-bold" />
                  </FormControl>
                  <FormMessage className="text-red-600 font-bold" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-bold uppercase text-xs">College Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@college.edu" {...field} className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all placeholder:text-black/30 font-bold" />
                  </FormControl>
                  <FormMessage className="text-red-600 font-bold" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold uppercase text-xs">Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all placeholder:text-black/30 font-bold" />
                    </FormControl>
                    <FormMessage className="text-red-600 font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold uppercase text-xs">Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-0 text-black font-bold">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <SelectItem value="1" className="focus:bg-yellow-200 focus:text-black font-bold">1st Year</SelectItem>
                        <SelectItem value="2" className="focus:bg-yellow-200 focus:text-black font-bold">2nd Year</SelectItem>
                        <SelectItem value="3" className="focus:bg-yellow-200 focus:text-black font-bold">3rd Year</SelectItem>
                        <SelectItem value="4" className="focus:bg-yellow-200 focus:text-black font-bold">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 font-bold" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-bold uppercase text-xs">Branch/Department</FormLabel>
                  <FormControl>
                    <Input placeholder="CSE, ECE, Mech..." {...field} className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all placeholder:text-black/30 font-bold" />
                  </FormControl>
                  <FormMessage className="text-red-600 font-bold" />
                </FormItem>
              )}
            />

            {resumeRequired && (
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold uppercase text-xs">Resume (PDF)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                          className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 file:border-r-2 file:border-black file:bg-primary file:text-black file:font-bold file:mr-4 file:py-2 file:px-4 hover:file:bg-primary/90"
                        />
                        <Upload className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground font-medium">Upload your resume (PDF, max 5MB)</p>
                    <FormMessage className="text-red-600 font-bold" />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full mt-2 neubrutalist-btn rounded-none h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
