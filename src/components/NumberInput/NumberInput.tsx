"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "~/app/shared/lib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value, ...props }, ref) => {
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
        <input
          type={"text"}
          placeholder={placeholder}
          value={value}
          className={cn(
            `${value ? "h-[36px]" : "h-[56px]"} ring-offset-background placeholder:text-muted-foreground flex w-full rounded-[5px] border !border-none bg-accent px-3 py-2 text-14  text-black !outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
NumberInput.displayName = "Input";

export { NumberInput };
