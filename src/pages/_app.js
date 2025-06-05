import "@/styles/globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        <title>e Pustak</title>
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
export default App;
