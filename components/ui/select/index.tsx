import React from 'react';
import { useSelect, SelectProps as AriaSelectProps } from 'react-aria';
import { useSelectState, SelectState } from 'react-stately';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectComponentProps extends AriaSelectProps<any> {
  label?: string;
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  placeholder,
  className,
  children,
  ...props
}: SelectComponentProps) {
  const state = useSelectState(props);
  const ref = React.useRef<HTMLDivElement>(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className="relative">
      {label && <label {...labelProps} className="text-sm font-medium block mb-1">{label}</label>}
      <button {...triggerProps} ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      >
        <span {...valueProps}>{state.selectedItem ? state.selectedItem.rendered : placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {state.isOpen && (
        <ul {...menuProps} className="absolute z-50 mt-2 min-w-[8rem] rounded-md border bg-popover p-1 shadow-md">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, { state });
            }
            return child;
          })}
        </ul>
      )}
    </div>
  );
}

interface SelectItemProps {
  item: any;
  state: SelectState<any>;
}

export function SelectItem({ item, state }: SelectItemProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused } = item.useOption({
    state,
    ref,
  });

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        isFocused && 'bg-accent',
        isSelected && 'font-semibold'
      )}
    >
      {item.rendered}
    </li>
  );
}

export { SelectTrigger } from 'react-aria';
export { SelectValue } from 'react-aria';
export { SelectContent } from 'react-aria';
