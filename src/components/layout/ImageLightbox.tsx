import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageLightboxProps = {
  thumbnailSrc: string;
  fullSrc?: string; // fallback to thumbnailSrc if not provided
  alt?: string;
};

export function ImageLightbox({ thumbnailSrc, fullSrc, alt }: ImageLightboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img
          src={thumbnailSrc}
          alt={alt}
          className="w-full h-48 object-cover rounded-none shadow-md cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 bg-black">
        <img
          src={fullSrc ?? thumbnailSrc}
          alt={alt}
          className="w-full h-auto max-h-[90vh] object-contain mx-auto"
        />
      </DialogContent>
    </Dialog>
  );
}
