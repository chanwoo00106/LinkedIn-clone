import { ThemeProvider } from "next-themes";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="description" content="Linkedin Clone" />
        <link
          rel="icon"
          href="https://static-exp1.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
