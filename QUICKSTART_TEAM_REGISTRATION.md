# Quick Start: Team Registration Feature

## What's New? 🎉

You now have a complete **Team Registration System** with:
- ✅ Multi-step form for 4-member teams (1 leader + 3 members)
- ✅ Resume upload for each team member (PDF, max 5MB)
- ✅ Email notifications to all team members
- ✅ Individual or Team registration options
- ✅ Progress tracking during registration

## Try It Now (No Setup Required!)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to any event:**
   - Go to `http://localhost:9002`
   - Click on any event

3. **Try Team Registration:**
   - Click the **"Team (4 members)"** tab
   - Fill in the Team Leader's information
   - Upload a PDF resume (any PDF file for testing)
   - Click "Next: Add Member 1"
   - Repeat for 3 more team members
   - Submit!

4. **Check the Results:**
   - Console logs will show email details
   - Uploaded resumes are saved in `public/uploads/resumes/`
   - Success message displays team registration confirmation

## What Works Out of the Box

- ✅ **Form Validation**: All fields validated, resume must be PDF under 5MB
- ✅ **File Upload**: Resumes saved locally in `public/uploads/resumes/`
- ✅ **Mock Emails**: Emails are logged to console (not actually sent yet)
- ✅ **Progress Tracking**: Visual progress bar shows registration steps
- ✅ **Back Button**: Can go back to edit previous members
- ✅ **Team Summary**: Shows all registered members before final submission

## Enable Real Email Sending

### Quick Setup with Gmail (5 minutes):

1. **Install nodemailer:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Get Gmail App Password:**
   - Go to Google Account → Security → 2-Step Verification
   - App passwords: https://myaccount.google.com/apppasswords
   - Generate password for "Mail"

3. **Add to `.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password-here
   SMTP_FROM=your-email@gmail.com
   ```

4. **Enable in code:**
   - Open `src/lib/email.ts`
   - Comment out the MOCK section
   - Uncomment the Nodemailer section
   - Restart your dev server

5. **Test it:**
   - Register a team using real email addresses
   - Check your inbox for beautiful confirmation emails!

## Email Preview

Each team member receives a personalized email with:
- 🎉 Welcome message and event details
- 👑 Special badge for team leader
- 📋 Their registration information
- 👥 Complete team member list
- 📅 Next steps and event preparation tips

## File Structure

```
New Files:
✨ components/TeamRegistrationForm.tsx      - Multi-step team form
✨ components/RegistrationSelector.tsx      - Individual/Team toggle
✨ src/app/api/register-team/route.ts       - Team registration API
✨ src/lib/email.ts                         - Email sending utility
✨ src/lib/file-upload.ts                   - Resume upload handler

Modified:
📝 src/app/events/[id]/page.tsx            - Now shows both registration types
```

## Test Scenarios

### Scenario 1: Happy Path
1. Fill all 4 member forms correctly
2. Upload PDF resumes for each
3. Submit successfully
4. Check console for email logs
5. Verify files in `public/uploads/resumes/`

### Scenario 2: Validation
1. Try to submit without resume → Error
2. Try to upload non-PDF file → Error
3. Leave required fields empty → Error
4. Upload file over 5MB → Error

### Scenario 3: Navigation
1. Fill leader form, click Next
2. Fill member 1, click Next
3. Click Back → See member 1 data preserved
4. Click Back again → See leader data preserved

## Next Steps

For production deployment:

1. **Email Service** (Choose one):
   - 📧 SendGrid (recommended): 100 free emails/day
   - 📧 AWS SES: $0.10 per 1000 emails
   - 📧 Mailgun, Postmark, Resend

2. **File Storage** (Choose one):
   - ☁️ Firebase Storage: 5GB free
   - ☁️ AWS S3: 5GB free first year
   - ☁️ Cloudinary: 10GB free

3. **Database**:
   - Already have MongoDB URI in `.env`
   - See `TEAM_REGISTRATION_SETUP.md` for integration code

## Customization

### Change Team Size
In `components/TeamRegistrationForm.tsx`:
```typescript
const totalSteps = 5; // Change from 4 to 5 for 5-member teams
```

### Modify Email Template
In `src/lib/email.ts`, edit the `generateEmailHTML` function to customize:
- Email styling
- Content
- Team details display

### Add More Fields
In `components/TeamRegistrationForm.tsx`:
- Update `memberSchema` to add new fields
- Add form fields in the JSX
- Update API to handle new fields

## Troubleshooting

**Q: Uploads folder doesn't exist?**
```bash
mkdir -p public/uploads/resumes
```

**Q: File upload fails?**
- Check file size < 5MB
- Ensure file is PDF format
- Verify write permissions

**Q: Email not in mock mode?**
- Check console logs start with `📧 [MOCK]`
- Verify nodemailer section is commented out

**Q: Form validation too strict?**
- Edit `memberSchema` in `TeamRegistrationForm.tsx`
- Adjust file size: Change `MAX_FILE_SIZE`
- Allow more file types: Add to `ACCEPTED_FILE_TYPES`

## Support

📖 Full Setup Guide: `TEAM_REGISTRATION_SETUP.md`
🐛 Issues: Check console logs for detailed errors
💡 Questions: Refer to inline code comments

Happy Team Registration! 🚀
