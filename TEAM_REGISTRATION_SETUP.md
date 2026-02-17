# Team Registration Setup Guide

This guide will help you set up the team registration feature with resume upload and email notifications.

## Features Implemented

1. ✅ Multi-step team registration form (1 team leader + 3 team members)
2. ✅ Resume upload (PDF only, max 5MB per member)
3. ✅ Email notifications to all team members
4. ✅ Team member role tracking (leader vs member)
5. ✅ Progress indicator for registration steps
6. ✅ Individual and Team registration options

## Files Created/Modified

### New Components:
- `components/TeamRegistrationForm.tsx` - Multi-step team registration form
- `components/RegistrationSelector.tsx` - Toggle between individual and team registration

### New API Routes:
- `src/app/api/register-team/route.ts` - Handles team registration submissions

### New Utilities:
- `src/lib/email.ts` - Email sending functionality
- `src/lib/file-upload.ts` - Resume file upload handling

### Modified Files:
- `src/app/events/[id]/page.tsx` - Updated to use RegistrationSelector

## Setup Instructions

### 1. Install Email Dependencies (Optional but Recommended)

For production email sending, install nodemailer:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 2. Configure Environment Variables

Add these to your `.env` file:

```env
# Existing MongoDB URI
NEXT_MONGOURI=mongodb+srv://himanshuk1205_db_user:ROmFNCvD6iLXTZs0@cluster0.7eufuh0.mongodb.net/?appName=Cluster0

# Email Configuration (Choose one email service)

# Option 1: Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=your-email@gmail.com

# Option 2: SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM=noreply@yourdomain.com

# Option 3: AWS SES
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
SES_FROM_EMAIL=noreply@yourdomain.com

# File Upload (Optional for cloud storage)
# Firebase Storage
FIREBASE_STORAGE_BUCKET=your-bucket-name

# AWS S3
S3_BUCKET_NAME=your-bucket-name
AWS_S3_REGION=us-east-1
```

### 3. Set Up Email Service

#### Using Gmail (Development Only):

1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password: https://myaccount.google.com/apppasswords
4. Use the generated password in `SMTP_PASSWORD`

**Note:** Gmail has daily sending limits. For production, use a dedicated email service.

#### Using SendGrid (Recommended for Production):

1. Sign up at https://sendgrid.com
2. Create an API key
3. Verify your sender email/domain
4. Update `src/lib/email.ts` to use SendGrid

#### Using AWS SES:

1. Set up AWS SES in your AWS console
2. Verify your email/domain
3. Get your AWS credentials
4. Update `src/lib/email.ts` to use AWS SES

### 4. Update Email Sending Code

Replace the mock implementation in `src/lib/email.ts`:

#### For Nodemailer (Gmail/SMTP):

```typescript
import nodemailer from 'nodemailer';

async function sendEmail(emailData: { to: string; subject: string; html: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
  });

  return { success: true };
}
```

#### For SendGrid:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(emailData: { to: string; subject: string; html: string }) {
  await sgMail.send({
    to: emailData.to,
    from: process.env.SENDGRID_FROM!,
    subject: emailData.subject,
    html: emailData.html,
  });

  return { success: true };
}
```

### 5. Set Up Cloud Storage (Optional)

For production, consider using cloud storage instead of local file storage:

#### Firebase Storage:

1. Set up Firebase project
2. Enable Firebase Storage
3. Update `src/lib/file-upload.ts` with Firebase implementation (code comments included)

#### AWS S3:

1. Create an S3 bucket
2. Set up IAM credentials
3. Update `src/lib/file-upload.ts` with S3 implementation (code comments included)

### 6. Create Uploads Directory

For local development, create the uploads directory:

```bash
mkdir -p public/uploads/resumes
```

Add to `.gitignore`:

```
public/uploads/
```

### 7. Database Integration (Optional)

To save team registrations to MongoDB, update `src/app/api/register-team/route.ts`:

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.NEXT_MONGOURI!);

// In the POST function:
await client.connect();
const db = client.db('hackathon');
const collection = db.collection('team_registrations');

await collection.insertOne({
  eventId,
  eventName,
  teamMembers,
  registeredAt: new Date(),
});

await client.close();
```

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to an event page

3. Click the "Team (4 members)" tab

4. Fill in team leader information and upload resume

5. Complete forms for all 3 team members

6. Submit the registration

7. Check console logs for email sending status

8. Verify files are saved in `public/uploads/resumes/`

## Production Checklist

- [ ] Set up production email service (SendGrid/AWS SES)
- [ ] Configure cloud storage (Firebase/S3)
- [ ] Set up proper error handling and logging
- [ ] Add rate limiting to API routes
- [ ] Implement file size and type validation on server
- [ ] Set up MongoDB integration
- [ ] Add proper authentication/authorization
- [ ] Test email deliverability
- [ ] Set up email templates
- [ ] Add spam prevention measures
- [ ] Configure CORS properly
- [ ] Add monitoring and alerts

## File Structure

```
clg/
├── components/
│   ├── RegistrationForm.tsx (Individual registration)
│   ├── TeamRegistrationForm.tsx (NEW - Team registration)
│   └── RegistrationSelector.tsx (NEW - Toggle between types)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── register-team/
│   │   │       └── route.ts (NEW - API endpoint)
│   │   └── events/[id]/
│   │       └── page.tsx (MODIFIED)
│   └── lib/
│       ├── email.ts (NEW - Email utilities)
│       └── file-upload.ts (NEW - File handling)
└── public/
    └── uploads/
        └── resumes/ (Created at runtime)
```

## Troubleshooting

### Emails not sending:
- Check environment variables are set correctly
- Verify email service credentials
- Check spam folder
- Review console logs for errors

### File upload fails:
- Ensure `public/uploads/resumes` directory exists
- Check file permissions
- Verify file size is under 5MB
- Ensure file is PDF format

### Form validation errors:
- Verify all required fields are filled
- Check resume file is selected
- Ensure email format is valid

## Support

For issues or questions, refer to:
- Next.js documentation: https://nextjs.org/docs
- Nodemailer documentation: https://nodemailer.com
- SendGrid documentation: https://docs.sendgrid.com
