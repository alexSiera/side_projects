"use client";

import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  url: string;
}

const PdfRenderer = ({ url }: Props) => {
  return (
    <div className='flex w-full flex-col items-center rounded-md bg-white shadow'>
      <div className='flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2'>
        <div className='flex items-center gap-1.5'>top bar</div>
      </div>
      <div className='max-h-screen w-full flex-1'>
        <div>
          <Document
            loading={
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            file={url}
            className='max-h-full'
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
