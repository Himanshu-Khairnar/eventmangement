interface TeamMember {
  name: string;
  email: string;
  studentId: string;
  year: string;
  branch: string;
  role: string;
  resumePath?: string;
}

export async function sendTeamRegistrationEmails(
  teamMembers: TeamMember[],
  eventName: string,
  eventId: string
) {
  try {
    const teamLeader = teamMembers.find(m => m.role === 'leader');
    const teamLeaderName = teamLeader?.name || 'Team Leader';

    // Send email to each team member
    const emailPromises = teamMembers.map(async (member) => {
      const isLeader = member.role === 'leader';

      const emailData = {
        to: member.email,
        subject: `Registration Confirmed: ${eventName}`,
        html: generateEmailHTML(member, teamLeaderName, isLeader, eventName, eventId, teamMembers),
      };

      // Send email using your preferred email service
      // For now, we'll use a mock implementation
      return sendEmail(emailData);
    });

    await Promise.all(emailPromises);
    console.log(`Sent ${emailPromises.length} registration confirmation emails`);
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new Error('Failed to send registration emails');
  }
}

function generateEmailHTML(
  member: TeamMember,
  teamLeaderName: string,
  isLeader: boolean,
  eventName: string,
  eventId: string,
  allMembers: TeamMember[]
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .info-box {
      background: white;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .team-list {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    .team-member {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
    .team-member:last-child {
      border-bottom: none;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Registration Confirmed!</h1>
    <p>You're all set for ${eventName}</p>
  </div>

  <div class="content">
    <p>Hi <strong>${member.name}</strong>,</p>

    <p>Congratulations! Your team registration has been successfully confirmed for <strong>${eventName}</strong>.</p>

    ${isLeader ? `
      <div class="info-box">
        <p style="margin: 0;">👑 <strong>You are the Team Leader</strong></p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
          As the team leader, you're responsible for coordinating with your team members and ensuring everyone is prepared for the event.
        </p>
      </div>
    ` : `
      <div class="info-box">
        <p style="margin: 0;">👤 <strong>Team Member</strong></p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
          Your team leader is <strong>${teamLeaderName}</strong>. Please coordinate with them for event details.
        </p>
      </div>
    `}

    <h3>📋 Your Registration Details</h3>
    <div class="info-box">
      <p><strong>Name:</strong> ${member.name}</p>
      <p><strong>Email:</strong> ${member.email}</p>
      <p><strong>Student ID:</strong> ${member.studentId}</p>
      <p><strong>Year:</strong> ${member.year}</p>
      <p><strong>Branch:</strong> ${member.branch}</p>
      <p><strong>Role:</strong> <span class="badge">${isLeader ? 'TEAM LEADER' : 'TEAM MEMBER'}</span></p>
    </div>

    <h3>👥 Your Team (${allMembers.length} members)</h3>
    <div class="team-list">
      ${allMembers.map(m => `
        <div class="team-member">
          ${m.role === 'leader' ? '👑' : '👤'} <strong>${m.name}</strong> - ${m.email}
        </div>
      `).join('')}
    </div>

    <h3>📅 Next Steps</h3>
    <ul>
      <li>Save this email for your records</li>
      <li>Mark your calendar for the event date</li>
      <li>Coordinate with your team members</li>
      <li>Prepare for an amazing experience!</li>
    </ul>

    <p>If you have any questions or concerns, please don't hesitate to reach out to our support team.</p>

    <p style="margin-top: 30px;">Best regards,<br><strong>Event Management Team</strong></p>
  </div>

  <div class="footer">
    <p>This is an automated confirmation email. Please do not reply to this message.</p>
    <p style="font-size: 12px; color: #999;">Event ID: ${eventId}</p>
  </div>
</body>
</html>
  `;
}

async function sendEmail(emailData: { to: string; subject: string; html: string }) {
  // Choose your email implementation:
  // 1. Use the mock implementation below (for testing without email setup)
  // 2. Uncomment one of the real implementations (nodemailer, SendGrid, AWS SES)

  // MOCK IMPLEMENTATION (current - for testing)
  console.log('📧 [MOCK] Sending email to:', emailData.to);
  console.log('📧 [MOCK] Subject:', emailData.subject);
  console.log('📧 [MOCK] Email would be sent in production');
  return { success: true };

  // REAL IMPLEMENTATION 1: Nodemailer with SMTP (Gmail, Office365, etc.)
  // Uncomment this section to use Nodemailer
  // First install: npm install nodemailer @types/nodemailer
  /*
  const nodemailer = require('nodemailer');

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
  */

  // REAL IMPLEMENTATION 2: SendGrid
  // Uncomment this section to use SendGrid
  // First install: npm install @sendgrid/mail
  /*
  const sgMail = require('@sendgrid/mail');

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: emailData.to,
      from: process.env.SENDGRID_FROM!,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log('✅ Email sent via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid email failed:', error);
    throw error;
  }
  */

  // REAL IMPLEMENTATION 3: AWS SES
  // Uncomment this section to use AWS SES
  // First install: npm install @aws-sdk/client-ses
  /*
  const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

  try {
    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [emailData.to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailData.html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailData.subject,
        },
      },
      Source: process.env.SES_FROM_EMAIL!,
    });

    const response = await sesClient.send(command);
    console.log('✅ Email sent via AWS SES:', response.MessageId);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error('❌ AWS SES email failed:', error);
    throw error;
  }
  */
}
