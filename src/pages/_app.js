import "@/styles/globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Head from "next/head";
import Script from "next/script";
import * as gtag from "/lib/gtag";

function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <LanguageProvider>
        <Head>
          <title>e Pustak</title>
        </Head>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}
export default App;
