import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dj-bg px-4">
      <div className="max-w-md text-center">
        <p className="font-cormorant text-[20px] text-dj-warm">Out of frame.</p>
        <h1 className="mt-3 font-playfair text-[88px] leading-none text-dj-ink">404</h1>
        <p className="mt-6 font-inter text-[14px] text-dj-mid">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-dj-ink px-8 py-3 font-inter text-[11px] uppercase text-dj-bg"
          style={{ letterSpacing: "0.15em" }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-dj-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="font-playfair text-[32px] text-dj-ink">This page didn't load.</h1>
        <p className="mt-3 font-inter text-[14px] text-dj-mid">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-dj-ink px-6 py-3 font-inter text-[11px] uppercase text-dj-bg"
            style={{ letterSpacing: "0.15em" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-dj-charcoal px-6 py-3 font-inter text-[11px] uppercase text-dj-charcoal"
            style={{ letterSpacing: "0.15em" }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Djay Photography — Premier Events Photography, Johannesburg" },
      { name: "description", content: "Grace and precision in every frame. High-end wedding, graduation, portrait, prom, corporate and real estate photography in Johannesburg by Djeha." },
      { name: "author", content: "Djay Photography" },
      { property: "og:title", content: "Djay Photography — Premier Events Photography" },
      { property: "og:description", content: "Capturing the essence of your most important moments. Johannesburg, South Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <CustomCursor />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pt-[72px]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </QueryClientProvider>
  );
}
