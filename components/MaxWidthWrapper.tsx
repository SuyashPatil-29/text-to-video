import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const MaxWidthWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-2.5 md:px-14",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
