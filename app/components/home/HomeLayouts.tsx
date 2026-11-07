'use client'

import { useSyncExternalStore } from "react";
import DesktopHomePage from "./DesktopHomePage";
import MobileHomePage from "./MobileHomePage";

const DESKTOP_QUERY = "(min-width: 768px)"; // Tailwind's md, which the wrappers below switch on

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/*
  The server can't know the screen size, so the prerendered page has both layouts and CSS shows the right one.
  Once in the browser, the other layout is unmounted so its canvases don't keep animating while hidden.
*/
export default function HomeLayouts() {
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null,
  );

  return (
    <>
      {isDesktop !== false && (
        <div className="hidden md:block">
          <DesktopHomePage />
        </div>
      )}
      {isDesktop !== true && (
        <div className="block md:hidden">
          <MobileHomePage />
        </div>
      )}
    </>
  );
}
