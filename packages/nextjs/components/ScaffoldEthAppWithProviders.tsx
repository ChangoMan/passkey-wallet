"use client";

import { OnchainKitScaffoldProvider } from "./OnchainKitScaffoldProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { ThirdwebProvider } from "thirdweb/react";
import { type State, WagmiProvider, useAccount } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { QrCodeReader } from "~~/components/burnerwallet/QrCodeReader";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGetHistory } from "~~/hooks/useGetHistory";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();
  const { address: connectedAddress = "" } = useAccount();
  const { refetchQuery } = useGetHistory({ address: connectedAddress });

  return (
    <>
      <div className="max-w-xl mx-auto min-h-screen h-full bg-base-200 md:border-x border-base-100 shadow-lg">
        <Header updateHistory={refetchQuery} />
        <main>{children}</main>
        <Footer />
      </div>
      <Toaster />
      <QrCodeReader />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: State | undefined;
}) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitScaffoldProvider>
          <ThirdwebProvider>
            <ProgressBar height="3px" color="#2299dd" />
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </ThirdwebProvider>
        </OnchainKitScaffoldProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
