"use client";

import { useRouter } from "next/navigation";

export default function NavLink({
  href,
  children,
  className = "",
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) return;

    e.preventDefault();

    document.documentElement.classList.add("is-transitioning");

    // small delay so animation starts BEFORE navigation
    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}