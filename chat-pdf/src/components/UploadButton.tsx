"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpenChange = (value: boolean) => {
    if (!value) {
      setIsOpen(value);
    }
  };

  const handleOpenUploadModal = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild onClick={handleOpenUploadModal}>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>example contentß</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
