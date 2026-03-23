"use client";

import { useRouter } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) return;

    e.preventDefault();

    document.documentElement.classList.add("is-transitioning");

    // small delay so animation starts BEFORE navigation
 router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}