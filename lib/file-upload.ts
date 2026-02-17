import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function saveResume(file: File, studentId: string): Promise<string> {
  try {
    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'resumes');

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedStudentId = studentId.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = file.name.split('.').pop() || 'pdf';
    const filename = `${sanitizedStudentId}_${timestamp}.${fileExtension}`;

    // Save file to uploads directory
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL path
    const publicPath = `/uploads/resumes/${filename}`;
    console.log('Resume saved:', publicPath);

    return publicPath;

    // TODO: For production, consider using cloud storage:
    /*
    // Firebase Storage Example:
    import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

    const storage = getStorage();
    const storageRef = ref(storage, `resumes/${filename}`);
    const snapshot = await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
    */

    /*
    // AWS S3 Example:
    import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

    const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `resumes/${filename}`,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/resumes/${filename}`;
    */
  } catch (error) {
    console.error('Error saving resume:', error);
    throw new Error('Failed to save resume file');
  }
}

// Optional: Function to delete old resumes
export async function deleteResume(filepath: string): Promise<boolean> {
  try {
    const { unlink } = await import('fs/promises');
    const fullPath = join(process.cwd(), 'public', filepath);
    await unlink(fullPath);
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
}
