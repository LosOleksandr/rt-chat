import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { Ubuntu } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ThemeProvider } from "@/components/theme-context";
const ubuntu = Ubuntu({ weight: ["400", "500", "700"], subsets: ["latin"] });

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <style jsx global>{`
          html {
            font-family: ${ubuntu.style.fontFamily};
          }
        `}</style>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        <Toaster />
      </SessionProvider>
    </>
  );
}
