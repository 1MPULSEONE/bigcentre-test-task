"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "~/app/shared/lib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");

    return (
      <div className={"relative flex flex-col rounded-[5px] bg-accent"}>
        {inputValue ? (
          <span
            className={
              "absoulute translate-y-1 pl-2  text-[0.775rem] text-[#666666]"
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
          value={inputValue}
          className={cn(
            `${inputValue ? "h-[36px]" : "h-[56px]"} ring-offset-background placeholder:text-muted-foreground flex w-full rounded-[5px] border !border-none bg-accent px-3 py-2 text-14  text-black !outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
          }}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
TextInput.displayName = "Input";

export { TextInput };
