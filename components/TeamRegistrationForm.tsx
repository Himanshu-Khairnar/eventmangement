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
import { Loader2, CheckCircle2, Upload, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const memberSchema = z.object({
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
  resume: z.any().refine((file) => file instanceof File, {
    message: "Resume is required.",
  }).refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, {
    message: "Resume must be less than 5MB.",
  }).refine((file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Only PDF files are accepted.",
  }),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface TeamMember extends MemberFormData {
  role: 'leader' | 'member';
}

export default function TeamRegistrationForm({ eventId, eventName }: { eventId: string, eventName: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      branch: "",
    },
  });

  const totalSteps = 4; // 1 leader + 3 members
  const progress = ((currentStep + 1) / totalSteps) * 100;

  async function onSubmit(values: MemberFormData) {
    const role = currentStep === 0 ? 'leader' : 'member';
    const newMember: TeamMember = { ...values, role };

    setTeamMembers([...teamMembers, newMember]);

    if (currentStep < totalSteps - 1) {
      // Move to next member
      setCurrentStep(currentStep + 1);
      form.reset();
    } else {
      // Submit all team members
      await submitTeam([...teamMembers, newMember]);
    }
  }

  async function submitTeam(allMembers: TeamMember[]) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('eventName', eventName);

      allMembers.forEach((member, index) => {
        formData.append(`member${index}_name`, member.name);
        formData.append(`member${index}_email`, member.email);
        formData.append(`member${index}_studentId`, member.studentId);
        formData.append(`member${index}_year`, member.year);
        formData.append(`member${index}_branch`, member.branch);
        formData.append(`member${index}_role`, member.role);
        formData.append(`member${index}_resume`, member.resume);
      });

      const response = await fetch('/api/register-team', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to register team');
      }

      const result = await response.json();
      console.log('Team registration successful:', result);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error registering team:', error);
      alert('Failed to register team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Restore previous member data
      const previousMember = teamMembers[currentStep - 1];
      if (previousMember) {
        form.reset(previousMember);
        setTeamMembers(teamMembers.slice(0, -1));
      }
    }
  }

  if (isSuccess) {
    return (
      <Card className="bg-primary/10 border-primary/20 shadow-lg">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-2xl">Team Registration Successful!</CardTitle>
            <CardDescription className="mt-2 text-foreground/80">
              Your team has been successfully registered for <strong>{eventName}</strong>.
              <br />
              Confirmation emails have been sent to all team members.
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(0);
              setTeamMembers([]);
              form.reset();
            }}
            variant="outline"
            className="mt-4"
          >
            Register Another Team
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getCurrentRole = () => {
    if (currentStep === 0) return 'Team Leader';
    return `Team Member ${currentStep}`;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-white/5 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Team Registration - {getCurrentRole()}</CardTitle>
        </div>
        <CardDescription>
          Register for {eventName} (Step {currentStep + 1} of {totalSteps})
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@college.edu" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch/Department</FormLabel>
                  <FormControl>
                    <Input placeholder="CSE, ECE, Mech..." {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Resume (PDF only, max 5MB)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        className="bg-background/50"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        {...field}
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-6">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Team...
                  </>
                ) : currentStep < totalSteps - 1 ? (
                  `Next: Add ${currentStep === 0 ? 'Member 1' : `Member ${currentStep + 1}`}`
                ) : (
                  "Complete Team Registration"
                )}
              </Button>
            </div>

            {teamMembers.length > 0 && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium mb-2">Team Members Added:</p>
                <ul className="text-sm space-y-1">
                  {teamMembers.map((member, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {member.role === 'leader' ? '👑' : '👤'} {member.name} ({member.email})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
