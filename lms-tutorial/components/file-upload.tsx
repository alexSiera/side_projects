"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ClientUploadedFileData } from "uploadthing/types";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const handleClientUploadComplete = (res: ClientUploadedFileData<null>[]) => {
    onChange(res?.[0].url);
  };

  const handleUploadError = (error: Error) => {
    toast.error(error?.message);
  };

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={handleClientUploadComplete}
      onUploadError={handleUploadError}
    />
  );
};
