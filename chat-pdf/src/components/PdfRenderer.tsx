"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  url: string;
}

const PdfRenderer = ({ url }: Props) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const CustomPageValidator = z.object({
    page: z.string().refine((num) => {
      const pageAsNumber = Number(num);
      if (!numPages) {
        return false;
      }

      return pageAsNumber > 0 && pageAsNumber <= numPages;
    }),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const onPrevPageClick = () => {
    setCurrPage((prev) => {
      if (prev - 1 > 1) {
        return prev - 1;
      }

      return 1;
    });
  };

  const onNextPageClick = () => {
    setCurrPage((prev) => {
      if (numPages && prev + 1 > numPages) {
        return numPages;
      }

      return prev + 1;
    });
  };

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className='flex w-full flex-col items-center rounded-md bg-white shadow'>
      <div className='flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2'>
        <div className='flex items-center gap-1.5'>
          <Button
            variant='ghost'
            aria-label='previous page'
            onClick={onPrevPageClick}
            disabled={currPage <= 1}
          >
            <ChevronDown className='h-4 w-4' />
          </Button>
          <div className='flex items-center gap-1.5'>
            <Input
              {...register("page")}
              className={cn(
                "h-8 w-12",
                errors.page && "focus-visible:ring-red-500",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className='space-x-1 text-sm text-zinc-700'>
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>
          <Button
            variant='ghost'
            aria-label='next page'
            onClick={onNextPageClick}
            disabled={currPage === numPages}
          >
            <ChevronUp className='h-4 w-4' />
          </Button>
        </div>
        <div className='space-x-2'></div>
      </div>
      <div className='max-h-screen w-full flex-1'>
        <div ref={ref}>
          <Document
            loading={
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onLoadError={() => {
              toast({
                title: "Error loading pdf",
                description: "Please try again later",
                variant: "destructive",
              });
            }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            file={url}
            className='max-h-full'
          >
            <Page width={width ? width : 1} pageNumber={currPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
