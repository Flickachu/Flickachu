"use client";

import { useRouter } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // ✅ added
};

export default function NavLink({
  href,
  children,
  className = "",
  onClick,
}: NavLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) return;

    e.preventDefault();

    document.documentElement.classList.add("is-transitioning");

    // run user onClick (like closing menu)
    if (onClick) onClick(); // ✅ important

    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}