import * as React from "react";

// tiny helper (optional)
const cx = (...c) => c.filter(Boolean).join(" ");

export const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors select-none focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md";

    const sizes = {
      md: "h-10 px-4 text-sm",
      sm: "h-9 px-3 text-sm",
      icon: "h-8 w-8 text-sm p-0", // square icon button
    };

    const variants = {
      // neutral black primary (if you need it elsewhere)
      default: "bg-black text-white hover:bg-gray-900 focus:ring-gray-300",
      // light gray outline like the screenshot
      outline:
        "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300",
      // transparent/ghost — use for the red trash icon
      ghost:
        "bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-300",
      destructiveGhost:
        "bg-transparent text-red-500 hover:bg-red-50 focus:ring-red-300",
    };

    // allow passing variant="destructiveGhost" if you want
    const resolved =
      variants[variant] ?? variants.default;

    return (
      <button
        ref={ref}
        className={cx(base, sizes[size] ?? sizes.md, resolved, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;


