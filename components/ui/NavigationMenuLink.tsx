"use client";

import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

interface NavMenuLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavMenuLink({ href, children, className }: NavMenuLinkProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={className}>
        {children}
      </NavigationMenuLink>
    </Link>
  );
}