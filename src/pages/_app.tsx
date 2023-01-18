"use client";
import "@style/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "@comp/UI/Components/Header/Header";
import Footer from "@comp/UI/Components/Footer/Footer";
import { User } from "@lib/types/users";

function BST({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [session, setSession] = useState<User | any>(false);

  useEffect(() => {
    if (!session) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/getsession`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.session) {
            setSession(data.session);
          }
        });
    }
  }, [session, setSession]);

  return (
    <>
      <ThemeProvider enableSystem={false} attribute="class">
        <Header session={session} />
        <Component {...pageProps} setSession={setSession} session={session} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default BST;
