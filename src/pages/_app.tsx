"use client";
import "@style/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "@comp/UI/Components/Header/Header";
import Footer from "@comp/UI/Components/Footer/Footer";

function BST({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <ThemeProvider
        enableSystem={true}
        defaultTheme="system"
        attribute="class"
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default BST;
