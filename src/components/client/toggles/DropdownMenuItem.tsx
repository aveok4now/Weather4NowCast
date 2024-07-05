import { MenuItem, type MenuItemProps } from "@headlessui/react";
import React, { forwardRef } from "react";

interface DropdownMenuItemProps extends MenuItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ icon, label, href, className, ...props }, ref) => {
  return (
    <MenuItem
      as="div"
      ref={ref}
      className={`flex items-center px-4 py-2 cursor-pointer ${className}`}
      {...props}
    >
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <a href={href} className="text-sm">
          {label}
        </a>
      </div>
    </MenuItem>
  );
});
