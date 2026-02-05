import { cn } from "../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:ring-2 transition-all",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
