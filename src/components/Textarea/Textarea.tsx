"use client";

import * as React from "react";
import { cn } from "~/app/shared/lib";
import { useState } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, value, ...props }, ref) => {
    return (
      <div className={"relative flex flex-col rounded-[5px] bg-accent"}>
        {value ? (
          <span
            className={
              "absoulute translate-y-2 pl-2  text-left text-[0.775rem] text-[#666666] "
            }
          >
            {placeholder}
          </span>
        ) : (
          <></>
        )}
        <textarea
          className={cn(
            "ring-offset-background flex min-h-[80px] w-full rounded-md border !border-none bg-accent px-3 py-2 text-sm placeholder:text-[#666666] focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
