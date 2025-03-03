import { Onest } from "next/font/google";
import { headers } from "next/headers";
import "@coinbase/onchainkit/styles.css";
import { cookieToInitialState } from "wagmi";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata = getMetadata({
  title: "Smart Burner Wallet",
  description: "Quickly create and manage a smart wallet using passkeys.",
});

const ScaffoldEthApp = async ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(wagmiConfig, (await headers()).get("cookie"));

  return (
    <html className={onest.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders initialState={initialState}>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
