"use client";

import { ReactNode, useEffect, useState } from "react";

const FALLBACK_URL = "https://github.com/ShankarSomu/tamilnandu/discussions";

// The address is assembled in the browser so Cloudflare's email obfuscation can't rewrite it.
export function ContactLink({
  className,
  showAddress = false,
  children
}: {
  className?: string;
  showAddress?: boolean;
  children?: ReactNode;
}) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(["info", "tamilnandu.org"].join("@"));
  }, []);

  return (
    <a href={address ? `mailto:${address}` : FALLBACK_URL} className={className}>
      {showAddress && address ? address : children}
    </a>
  );
}
