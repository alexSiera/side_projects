"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const getContent = () => {
    if (isLoading) {
      return <Skeleton height={100} className='my-2' count={3} />;
    }

    if (files?.length) {
      return (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
              >
                name
              </li>
            ))}
        </ul>
      );
    }

    return (
      <div className='mt-16 flex flex-col items-center gap-2'>
        <Ghost className='h-8 w-8 text-zinc-800' />
        <h3 className='text-xl font-semibold'>Pretty empty around here</h3>
        <p>Let&apos;s upload you first PDF.</p>
      </div>
    );
  };

  const content = getContent();

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-5xl font-bold text-gray-900'>My Files</h1>
        <UploadButton />
      </div>
      {/* display all user files */}
      {content}
    </main>
  );
};

export default Dashboard;
