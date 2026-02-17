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

const createMemberSchema = (resumeRequired: boolean) => {
  const baseSchema = {
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    studentId: z.string().min(5, { message: "Student ID must be at least 5 characters." }),
    year: z.string({ required_error: "Please select your year." }),
    branch: z.string().min(2, { message: "Branch is required (e.g. CSE, ECE)." }),
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

type MemberFormDataBase = {
  name: string;
  email: string;
  studentId: string;
  year: string;
  branch: string;
  resume?: File;
};

interface TeamMember extends MemberFormDataBase {
  role: 'leader' | 'member';
}

export default function TeamRegistrationForm({
  eventId,
  eventName,
  minTeamSize = 2,
  maxTeamSize = 4,
  resumeRequired = false
}: {
  eventId: string;
  eventName: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  resumeRequired?: boolean;
}) {
  const memberSchema = createMemberSchema(resumeRequired);
  type MemberFormData = z.infer<typeof memberSchema>;

  const [currentStep, setCurrentStep] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<MemberFormDataBase>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      branch: "",
    },
  });

  const totalSteps = maxTeamSize;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const canSkip = teamMembers.length >= minTeamSize;

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

  async function handleFinishEarly() {
    // Submit with current team members (must meet minimum)
    if (teamMembers.length >= minTeamSize) {
      await submitTeam(teamMembers);
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
        if (member.resume) {
          formData.append(`member${index}_resume`, member.resume);
        }
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
      <Card className="bg-green-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 bg-black flex items-center justify-center text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black uppercase text-black">Team Registration Successful!</CardTitle>
            <CardDescription className="mt-2 text-black font-medium">
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
            className="mt-4 neubrutalist-btn bg-white hover:bg-white text-black hover:text-black"
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
    <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
      <CardHeader className="border-b-2 border-black bg-yellow-300">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-black" />
          <CardTitle className="font-black uppercase text-black">Team Registration - {getCurrentRole()}</CardTitle>
        </div>
        <CardDescription className="text-black font-bold text-opacity-80">
          Register for {eventName} (Step {currentStep + 1} of {totalSteps}) • Min {minTeamSize}, Max {maxTeamSize}
        </CardDescription>
        <Progress value={progress} className="mt-4 h-4 border-2 border-black rounded-none bg-white [&>div]:bg-black" />
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
                  <FormLabel className="text-black font-bold uppercase text-xs">Email Address</FormLabel>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold uppercase text-xs">Resume (PDF only, max 5MB)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          className="bg-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all file:text-black file:font-bold file:bg-yellow-300 file:border-0 file:mr-4 file:px-4 file:py-2 h-12 pt-1.5"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 font-bold" />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-2 mt-6">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 neubrutalist-btn bg-white hover:bg-white text-black hover:text-black"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}

              {canSkip && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFinishEarly}
                  className="flex-1 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-blue-200 hover:bg-blue-300 text-black font-bold"
                  disabled={isSubmitting}
                >
                  Finish with {teamMembers.length} Members
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 neubrutalist-btn h-12 text-lg"
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
              <div className="mt-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm font-bold mb-2 text-black uppercase">Team Members Added:</p>
                <ul className="text-sm space-y-1">
                  {teamMembers.map((member, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-black font-medium">
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
