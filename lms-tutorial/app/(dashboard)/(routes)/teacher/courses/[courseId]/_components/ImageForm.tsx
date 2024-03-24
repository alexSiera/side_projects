"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Image from "next/image";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
interface ImageFormProps {
  initialData: Course["imageUrl"];
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData: initialImageUrl,
  courseId,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const renderEditingBlock = () => {
    if (isEditing) {
      return <>Cancel</>;
    }

    if (!isEditing) {
      if (!initialImageUrl) {
        return (
          <>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add an image
          </>
        );
      }
      return (
        <>
          <Pencil className="h-4 w-4 mr-2" />
          Edit image
        </>
      );
    }
  };

  const renderImagePreviewBlock = () => {
    if (!isEditing) {
      if (!initialImageUrl) {
        return (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        );
      }
      return (
        <div className="relative aspect-video mt-2">
          <Image
            alt="Upload"
            fill
            className="object-cover rounded-md"
            src={initialImageUrl}
          />
        </div>
      );
    }
  };

  const renderFormBlock = () => {
    const handleOnChange = (imageUrl?: string) => {
      if (imageUrl) {
        onSubmit({ imageUrl });
      }
    };

    if (isEditing) {
      return (
        <div>
          <FileUpload endpoint="courseImage" onChange={handleOnChange} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 Aspect ratio recomended
          </div>
        </div>
      );
    }

    return (
      <p
        className={cn(
          "text-sm mt-2",
          !initialImageUrl && "text-slate-500 italic"
        )}
      >
        {initialImageUrl || "No description"}
      </p>
    );
  };

  const editingBlock = renderEditingBlock();
  const imagePreview = renderImagePreviewBlock();
  const formBlock = renderFormBlock();

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {editingBlock}
        </Button>
      </div>
      {imagePreview}
      {formBlock}
    </div>
  );
};
