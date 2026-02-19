"use client";

import { useState } from "react";
import type { Event } from "@/lib/definitions";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useData } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

type EventFormProps = {
  event?: Event;
};

interface DynamicListItem {
  value: string;
}

interface ScheduleItem {
  time: string;
  activity: string;
}

interface PrizeItem {
  position: string;
  prize: string;
}

interface ContactItem {
  name: string;
  email: string;
  phone: string;
}

export default function EventForm({ event }: EventFormProps) {
  const { addEvent, updateEvent } = useData();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic arrays state
  const [prerequisites, setPrerequisites] = useState<DynamicListItem[]>(
    event?.prerequisites?.map((p) => ({ value: p })) || [{ value: "" }],
  );
  const [requirements, setRequirements] = useState<DynamicListItem[]>(
    event?.requirements?.map((r) => ({ value: r })) || [{ value: "" }],
  );
  const [whatToBring, setWhatToBring] = useState<DynamicListItem[]>(
    event?.whatToBring?.map((w) => ({ value: w })) || [{ value: "" }],
  );
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    event?.schedule || [{ time: "", activity: "" }],
  );
  const [rules, setRules] = useState<DynamicListItem[]>(
    event?.rules?.map((r) => ({ value: r })) || [{ value: "" }],
  );
  const [prizes, setPrizes] = useState<PrizeItem[]>(
    event?.prizes || [{ position: "", prize: "" }],
  );
  const [benefits, setBenefits] = useState<DynamicListItem[]>(
    event?.benefits?.map((b) => ({ value: b })) || [{ value: "" }],
  );
  const [eligibility, setEligibility] = useState<DynamicListItem[]>(
    event?.eligibility?.map((e) => ({ value: e })) || [{ value: "" }],
  );
  const [contactInfo, setContactInfo] = useState<ContactItem[]>(
    event?.contactInfo || [{ name: "", email: "", phone: "" }],
  );

  // Helper functions for dynamic arrays
  const addPrerequisite = () =>
    setPrerequisites([...prerequisites, { value: "" }]);
  const removePrerequisite = (index: number) =>
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  const updatePrerequisite = (index: number, value: string) => {
    const updated = [...prerequisites];
    updated[index].value = value;
    setPrerequisites(updated);
  };

  const addRequirement = () =>
    setRequirements([...requirements, { value: "" }]);
  const removeRequirement = (index: number) =>
    setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index].value = value;
    setRequirements(updated);
  };

  const addWhatToBring = () => setWhatToBring([...whatToBring, { value: "" }]);
  const removeWhatToBring = (index: number) =>
    setWhatToBring(whatToBring.filter((_, i) => i !== index));
  const updateWhatToBring = (index: number, value: string) => {
    const updated = [...whatToBring];
    updated[index].value = value;
    setWhatToBring(updated);
  };

  const addScheduleItem = () =>
    setSchedule([...schedule, { time: "", activity: "" }]);
  const removeScheduleItem = (index: number) =>
    setSchedule(schedule.filter((_, i) => i !== index));
  const updateScheduleItem = (
    index: number,
    field: "time" | "activity",
    value: string,
  ) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addRule = () => setRules([...rules, { value: "" }]);
  const removeRule = (index: number) =>
    setRules(rules.filter((_, i) => i !== index));
  const updateRule = (index: number, value: string) => {
    const updated = [...rules];
    updated[index].value = value;
    setRules(updated);
  };

  const addPrize = () => setPrizes([...prizes, { position: "", prize: "" }]);
  const removePrize = (index: number) =>
    setPrizes(prizes.filter((_, i) => i !== index));
  const updatePrize = (
    index: number,
    field: "position" | "prize",
    value: string,
  ) => {
    const updated = [...prizes];
    updated[index][field] = value;
    setPrizes(updated);
  };

  const addBenefit = () => setBenefits([...benefits, { value: "" }]);
  const removeBenefit = (index: number) =>
    setBenefits(benefits.filter((_, i) => i !== index));
  const updateBenefit = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index].value = value;
    setBenefits(updated);
  };

  const addEligibility = () => setEligibility([...eligibility, { value: "" }]);
  const removeEligibility = (index: number) =>
    setEligibility(eligibility.filter((_, i) => i !== index));
  const updateEligibility = (index: number, value: string) => {
    const updated = [...eligibility];
    updated[index].value = value;
    setEligibility(updated);
  };

  const addContact = () =>
    setContactInfo([...contactInfo, { name: "", email: "", phone: "" }]);
  const removeContact = (index: number) =>
    setContactInfo(contactInfo.filter((_, i) => i !== index));
  const updateContact = (
    index: number,
    field: "name" | "email" | "phone",
    value: string,
  ) => {
    const updated = [...contactInfo];
    updated[index][field] = value;
    setContactInfo(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Construct event object
    const teamSizeMin = parseInt(formData.get("teamSizeMin") as string) || 1;
    const teamSizeMax = parseInt(formData.get("teamSizeMax") as string) || 1;
    const allowIndividual = formData.get("allowIndividual") === "on";
    const resumeRequired = formData.get("resumeRequired") === "on";

    const newEvent = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      detailedDescription:
        (formData.get("detailedDescription") as string) || undefined,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      venue: formData.get("venue") as string,
      category: formData.get("category") as Event["category"],
      committee: formData.get("committee") as string,
      image: formData.get("image") as string,
      registrationLink: formData.get("registrationLink") as string,
      registrationFee: (formData.get("registrationFee") as string) || undefined,
      teamSize: {
        min: teamSizeMin,
        max: teamSizeMax,
        allowIndividual: allowIndividual,
      },
      resumeRequired: resumeRequired,
      prerequisites: prerequisites
        .filter((p) => p.value.trim())
        .map((p) => p.value.trim()),
      requirements: requirements
        .filter((r) => r.value.trim())
        .map((r) => r.value.trim()),
      whatToBring: whatToBring
        .filter((w) => w.value.trim())
        .map((w) => w.value.trim()),
      schedule: schedule.filter((s) => s.time.trim() && s.activity.trim()),
      rules: rules.filter((r) => r.value.trim()).map((r) => r.value.trim()),
      prizes: prizes.filter((p) => p.position.trim() && p.prize.trim()),
      benefits: benefits
        .filter((b) => b.value.trim())
        .map((b) => b.value.trim()),
      eligibility: eligibility
        .filter((e) => e.value.trim())
        .map((e) => e.value.trim()),
      contactInfo: contactInfo.filter(
        (c) => c.name.trim() && c.email.trim() && c.phone.trim(),
      ),
    };

    try {
      if (event) {
        await updateEvent(event.id, newEvent);
        toast({
          title: "Success",
          description: "Event updated successfully.",
        });
      } else {
        await addEvent(newEvent);
        toast({
          title: "Success",
          description: "Event created successfully.",
        });
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${event ? "update" : "create"} event. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={event?.name}
                  className="border-2  rounded-none border-black"
                  required
                  placeholder="e.g. Annual Tech Symposium"
                />
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={event?.description}
                  className="border-2  rounded-none border-black"
                  rows={3}
                  required
                  placeholder="Brief event description..."
                />
              </div>
              <div>
                <Label htmlFor="detailedDescription">
                  Detailed Description
                </Label>
                <Textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  defaultValue={event?.detailedDescription}
                  className="border-2  rounded-none border-black"
                  rows={5}
                  placeholder="Full event description with all details..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Details Cards */}
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {prerequisites.map((prereq, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={prereq.value}
                    onChange={(e) => updatePrerequisite(index, e.target.value)}
                    placeholder="e.g., Basic programming knowledge"
                    className="border-2 border-black rounded-none"
                  />
                  {prerequisites.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removePrerequisite(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addPrerequisite}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Prerequisite
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req.value}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="e.g., Register 2 days in advance"
                    className="border-2 border-black rounded-none"
                  />
                  {requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addRequirement}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Requirement
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>What to Bring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {whatToBring.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item.value}
                    onChange={(e) => updateWhatToBring(index, e.target.value)}
                    placeholder="e.g., Student ID card"
                    className="border-2 border-black rounded-none"
                  />
                  {whatToBring.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeWhatToBring(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addWhatToBring}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item.time}
                    onChange={(e) =>
                      updateScheduleItem(index, "time", e.target.value)
                    }
                    placeholder="09:00 AM"
                    className="w-32 border-2 border-black rounded-none"
                  />
                  <Input
                    value={item.activity}
                    onChange={(e) =>
                      updateScheduleItem(index, "activity", e.target.value)
                    }
                    placeholder="Opening Ceremony"
                    className="flex-1 border-2 border-black rounded-none"
                  />
                  {schedule.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeScheduleItem(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addScheduleItem}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Schedule Item
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Rules & Regulations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {rules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={rule.value}
                    onChange={(e) => updateRule(index, e.target.value)}
                    placeholder="e.g., All participants must check in 30 minutes before"
                    className="border-2 border-black rounded-none"
                  />
                  {rules.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeRule(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addRule}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Rule
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Prizes & Recognition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {prizes.map((prize, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={prize.position}
                    onChange={(e) =>
                      updatePrize(index, "position", e.target.value)
                    }
                    placeholder="1st Place"
                    className="w-40 border-2 border-black rounded-none"
                  />
                  <Input
                    value={prize.prize}
                    onChange={(e) =>
                      updatePrize(index, "prize", e.target.value)
                    }
                    placeholder="$1000 + Trophy"
                    className="flex-1 border-2 border-black rounded-none"
                  />
                  {prizes.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removePrize(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addPrize}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Prize
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Benefits (Why Participate?)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit.value}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="e.g., Network with industry professionals"
                    className="border-2 border-black rounded-none"
                  />
                  {benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addBenefit}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Benefit
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eligibility.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item.value}
                    onChange={(e) => updateEligibility(index, e.target.value)}
                    placeholder="e.g., Currently enrolled students only"
                    className="border-2 border-black rounded-none"
                  />
                  {eligibility.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeEligibility(index)}
                      className="shrink-0 border-2 border-black rounded-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addEligibility}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Criteria
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="space-y-2 p-4 border-2 border-black bg-gray-50"
                >
                  <div className="flex gap-2">
                    <Input
                      value={contact.name}
                      onChange={(e) =>
                        updateContact(index, "name", e.target.value)
                      }
                      placeholder="Name"
                      className="border-2 border-black rounded-none"
                    />
                    {contactInfo.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeContact(index)}
                        className="shrink-0 border-2 border-black rounded-none"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={contact.email}
                    onChange={(e) =>
                      updateContact(index, "email", e.target.value)
                    }
                    placeholder="Email"
                    type="email"
                    className="border-2 border-black rounded-none"
                  />
                  <Input
                    value={contact.phone}
                    onChange={(e) =>
                      updateContact(index, "phone", e.target.value)
                    }
                    placeholder="Phone"
                    type="tel"
                    className="border-2 border-black rounded-none"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addContact}
                className="w-full border-2 border-black rounded-none"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Contact
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select name="category" defaultValue={event?.category} required>
                  <SelectTrigger className="border-2  rounded-none border-black">
                    <SelectValue
                      className="border-2  rounded-none border-black"
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="  rounded-none border-black"
                      value="Technical"
                    >
                      Technical
                    </SelectItem>
                    <SelectItem
                      className="  rounded-none border-black"
                      value="Cultural"
                    >
                      Cultural
                    </SelectItem>
                    <SelectItem
                      className="  rounded-none border-black"
                      value="Sports"
                    >
                      Sports
                    </SelectItem>
                    <SelectItem
                      className="  rounded-none border-black"
                      value="Workshop"
                    >
                      Workshop
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="committee">Organizing Committee</Label>
                <Input
                  className="border-2  rounded-none border-black"
                  id="committee"
                  name="committee"
                  defaultValue={event?.committee}
                  required
                  placeholder="e.g. CSI"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    className="border-2  rounded-none border-black"
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={event?.date.split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    className="border-2  rounded-none border-black"
                    id="time"
                    name="time"
                    defaultValue={event?.time}
                    required
                    placeholder="e.g. 10:00 AM"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input
                  className="border-2  rounded-none border-black"
                  id="venue"
                  name="venue"
                  defaultValue={event?.venue}
                  required
                  placeholder="e.g. Auditorium"
                />
              </div>
              <div>
                <Label>Image</Label>
                <Select name="image" defaultValue={event?.image} required>
                  <SelectTrigger className="border-2  rounded-none border-black">
                    <SelectValue placeholder="Select an image" />
                  </SelectTrigger>
                  <SelectContent>
                    {PlaceHolderImages.map((img) => (
                      <SelectItem key={img.id} value={img.imageUrl}>
                        {img.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a placeholder image cover.
                </p>
              </div>
              <div>
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  className="border-2  rounded-none border-black"
                  id="registrationLink"
                  name="registrationLink"
                  defaultValue={event?.registrationLink || "#"}
                  required
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="registrationFee">Registration Fee</Label>
                <Input
                  className="border-2  rounded-none border-black"
                  id="registrationFee"
                  name="registrationFee"
                  defaultValue={event?.registrationFee}
                  placeholder="e.g., Free, $10, $5 (Early Bird)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty if not applicable
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-bold">
                  Team Size Configuration
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamSizeMin" className="text-sm">
                      Min Team Size
                    </Label>
                    <Input
                      id="teamSizeMin"
                      name="teamSizeMin"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue={event?.teamSize?.min || 1}
                      required
                      placeholder="1"
                      className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSizeMax" className="text-sm">
                      Max Team Size
                    </Label>
                    <Input
                      id="teamSizeMax"
                      name="teamSizeMax"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue={event?.teamSize?.max || 1}
                      required
                      placeholder="4"
                      className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="allowIndividual"
                    name="allowIndividual"
                    defaultChecked={event?.teamSize?.allowIndividual}
                    className="border-2 border-black data-[state=checked]:bg-primary data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor="allowIndividual"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Allow Individual Registration
                  </Label>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-black">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resumeRequired"
                    name="resumeRequired"
                    defaultChecked={event?.resumeRequired}
                    className="border-2 border-black data-[state=checked]:bg-primary data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor="resumeRequired"
                    className="text-sm font-bold cursor-pointer"
                  >
                    Resume Required for Registration
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enable this if participants need to upload their resume during
                  registration
                </p>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : event
                ? "Update Event"
                : "Create Event"}
          </Button>
        </div>
      </div>
    </form>
  );
}
