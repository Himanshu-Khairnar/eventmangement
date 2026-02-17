import { NextRequest, NextResponse } from 'next/server';
import { sendTeamRegistrationEmails } from '@/lib/email';
import { saveResume } from '@/lib/file-upload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const eventId = formData.get('eventId') as string;
    const eventName = formData.get('eventName') as string;

    // Extract team members data
    const teamMembers = [];
    let memberIndex = 0;

    while (formData.get(`member${memberIndex}_name`)) {
      const member = {
        name: formData.get(`member${memberIndex}_name`) as string,
        email: formData.get(`member${memberIndex}_email`) as string,
        studentId: formData.get(`member${memberIndex}_studentId`) as string,
        year: formData.get(`member${memberIndex}_year`) as string,
        branch: formData.get(`member${memberIndex}_branch`) as string,
        role: formData.get(`member${memberIndex}_role`) as string,
        resume: formData.get(`member${memberIndex}_resume`) as File,
      };

      // Save resume file
      const resumePath = await saveResume(member.resume, member.studentId);

      teamMembers.push({
        ...member,
        resumePath,
      });

      memberIndex++;
    }

    if (teamMembers.length === 0) {
      return NextResponse.json(
        { error: 'No team members provided' },
        { status: 400 }
      );
    }

    // TODO: Save team registration to database
    // You can add MongoDB/Firebase logic here
    console.log('Team Registration:', {
      eventId,
      eventName,
      teamMembers: teamMembers.map(m => ({
        ...m,
        resume: undefined, // Don't log file object
      })),
    });

    // Send emails to all team members
    await sendTeamRegistrationEmails(teamMembers, eventName, eventId);

    return NextResponse.json({
      success: true,
      message: 'Team registered successfully',
      teamSize: teamMembers.length,
      teamLeader: teamMembers[0].name,
    });
  } catch (error) {
    console.error('Error registering team:', error);
    return NextResponse.json(
      { error: 'Failed to register team', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
