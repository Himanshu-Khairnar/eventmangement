'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ResumeViewerProps {
    isOpen: boolean;
    onClose: () => void;
    resumeUrl: string;
    studentName: string;
}

export default function ResumeViewer({ isOpen, onClose, resumeUrl, studentName }: ResumeViewerProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle>Resume: {studentName}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full bg-muted/20 rounded-md overflow-hidden">
                    {resumeUrl ? (
                        <iframe
                            src={resumeUrl}
                            className="w-full h-full"
                            title={`Resume of ${studentName}`}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No resume available
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
