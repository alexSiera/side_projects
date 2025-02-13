import { Cloud, File } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";

import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean | null>(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {} = useUploadThing("");

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        console.log(acceptedFile);
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        // handle file uploading
        clearInterval(progressInterval);
        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div
            {...getRootProps()}
            className='m-4 h-64 rounded-lg border border-dashed border-gray-300'
          >
            <div className='flex h-full w-full items-center justify-center'>
              <label
                htmlFor='dropzone-file'
                className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100'
              >
                <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                  <Cloud className='mb-2 h-6 w-6 text-zinc-500' />
                  <p className='mb-2 text-sm text-zinc-700'>
                    <span className='font-semibold'> Click to upload</span> or
                    grag and drop
                  </p>
                  <p className='text-xs text-zinc-500'>PDF (up to 4mb)</p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div className='flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200'>
                    <div className='grid h-full place-items-center px-3 py-2'>
                      <File className='h-4 w-4 text-blue-500' />
                    </div>
                    <div className='tex-sm h-full truncate px-3 py-2'>
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {isUploading ? (
                  <div className='mx-auto mt-4 w-full max-w-xs'>
                    <Progress
                      value={uploadProgress}
                      className='h-1 w-full bg-zinc-200'
                    />
                  </div>
                ) : null}
              </label>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default UploadDropzone;
