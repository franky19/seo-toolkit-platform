/** @format */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

type AccordionMode = "single" | "multiple";

type BaseItem = {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
};

type SingleProps = {
  type?: "single";
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  items: BaseItem[];
  className?: string;
};

type MultipleProps = {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  items: BaseItem[];
  className?: string;
};

export type AccordionProps = SingleProps | MultipleProps;

function isSingle(props: AccordionProps): props is SingleProps {
  return props.type !== "multiple";
}

export function Accordion(props: AccordionProps) {
  const { items, className } = props;
  const isMultiple = !isSingle(props);
  const [openSingle, setOpenSingle] = React.useState(
    props.type === "single" ? (props.defaultValue ?? "") : "",
  );
  const [openMultiple, setOpenMultiple] = React.useState<string[]>(
    props.type === "multiple" ? (props.defaultValue ?? []) : [],
  );

  const activeSingle = isSingle(props) ? (props.value ?? openSingle) : "";
  const activeMultiple = isMultiple ? (props.value ?? openMultiple) : [];
  const collapsible = isSingle(props) ? (props.collapsible ?? false) : true;

  const toggleSingle = (value: string) => {
    const next = activeSingle === value ? (collapsible ? "" : value) : value;
    if (props.value === undefined) setOpenSingle(next);
    if (props.onValueChange)
      (props.onValueChange as (value: string) => void)(next);
  };

  const toggleMultiple = (value: string) => {
    const next = activeMultiple.includes(value)
      ? activeMultiple.filter((v) => v !== value)
      : [...activeMultiple, value];
    if (props.value === undefined) setOpenMultiple(next);
    if (props.onValueChange)
      (props.onValueChange as (value: string[]) => void)(next);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {items.map((item) => {
          const open = isMultiple
            ? activeMultiple.includes(item.value)
            : activeSingle === item.value;
          const contentId = `accordion-content-${item.value}`;
          const buttonId = `accordion-trigger-${item.value}`;
          return (
            <div
              key={item.value}
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={contentId}
                  disabled={item.disabled}
                  onClick={() =>
                    isMultiple
                      ? toggleMultiple(item.value)
                      : toggleSingle(item.value)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                  <span>{item.title}</span>
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  />
                  {/* <span className={cn("flex h-5 w-5 items-center justify-center transition-transform duration-300", open && "rotate-180")}>⌄</span> */}
                </button>
              </h3>
              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid overflow-hidden px-5 transition-all duration-300 ease-in-out",
                  open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
                )}>
                <div className="min-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground">
                  {item.children}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
