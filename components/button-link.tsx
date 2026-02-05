import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
};

const ButtonLink = ({ children, href }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className="hover:text-primary transition-colors border rounded-lg p-2"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
