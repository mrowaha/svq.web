import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export interface UploadNotificationProps {
    status: 'uploading' | 'success' | 'error';
    fileName?: string;
    error?: string;
}

const UploadNotification = ({ status, fileName, error }: UploadNotificationProps) => {
    if (status === 'uploading') {
        return (
            <Alert className="fixed bottom-4 right-4 w-96 bg-zinc-800 border-zinc-700 text-white">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <AlertTitle className="ml-2">Uploading Document</AlertTitle>
                <AlertDescription className="ml-2 mt-2 text-zinc-400">
                    {fileName ? `Uploading ${fileName}...` : 'Uploading document...'}
                </AlertDescription>
            </Alert>
        );
    }

    if (status === 'success') {
        return (
            <Alert className="fixed bottom-4 right-4 w-96 bg-zinc-800 border-zinc-700 text-white">
                <CheckCircle2 className="h-5 w-5" style={{ color: '#4ade80' }} strokeWidth={2.5} />
                <AlertTitle className="ml-2 font-semibold">Upload Complete</AlertTitle>
                <AlertDescription className="ml-2 mt-2 text-zinc-400">
                    {fileName ? `${fileName} has been uploaded successfully.` : 'Document has been uploaded successfully.'}
                </AlertDescription>
            </Alert>
        );
    }

    if (status === 'error') {
        return (
            <Alert className="fixed bottom-4 right-4 w-96 bg-zinc-800 border-zinc-700 text-white" variant="destructive">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="ml-2">Upload Failed</AlertTitle>
                <AlertDescription className="ml-2 mt-2 text-zinc-400">
                    {error || 'There was an error uploading your document. Please try again.'}
                </AlertDescription>
            </Alert>
        );
    }

    return null;
};

export default UploadNotification;