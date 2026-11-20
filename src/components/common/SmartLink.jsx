import React, { forwardRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function isSamePage(currentPathname, targetHref) {
  if (!targetHref) return false;

  let cleanTarget = targetHref;
  try {
    if (cleanTarget.startsWith("http://") || cleanTarget.startsWith("https://")) {
      const url = new URL(cleanTarget);
      if (url.origin !== window.location.origin) return false;
      cleanTarget = url.pathname + url.search + url.hash;
    }
  } catch {}

  const [targetPath] = cleanTarget.split(/[?#]/);
  const normalizedCurrent = (currentPathname || "/").replace(/\/+$/, "") || "/";
  const normalizedTarget = (targetPath || "/").replace(/\/+$/, "") || "/";

  return normalizedCurrent === normalizedTarget;
}

/**
 * ScrollManager: Automatically scrolls to top on route change or to target hash anchor
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    // Disable automatic browser scroll restoration so it never jumps down on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      // On initial load or page refresh, always clean any anchor hash and force land at top
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    if (hash) {
      const targetId = hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

export function useSmartNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href, onClick) => (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (!href) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.button && e.button !== 0)) {
      return;
    }

    if (
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("sms:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    const currentPath = (location.pathname || "/").replace(/\/+$/, "") || "/";

    // Handle hash links when clicked
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);

      // If on another route like /products, navigate back to home with the hash
      if (currentPath !== "/") {
        navigate(`/${href}`);
        return;
      }

      if (!targetId || targetId === "home" || targetId === "top") {
        if (window.scrollY > 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const [pathPart, hashPart] = href.split("#");
    const targetPath = (pathPart || "/").replace(/\/+$/, "") || "/";

    if (currentPath === targetPath) {
      e.preventDefault();
      if (hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return handleNavigation;
}

export const SmartLink = forwardRef(function SmartLink(
  { href, to, onClick, className, activeClassName, children, ...rest },
  ref
) {
  const target = to || href || "#";
  const smartNavigate = useSmartNavigate();
  const location = useLocation();
  const isActive = isSamePage(location.pathname, target);

  return (
    <a
      ref={ref}
      href={target}
      onClick={smartNavigate(target, onClick)}
      className={cn(className, isActive && activeClassName)}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
});

export default SmartLink;
