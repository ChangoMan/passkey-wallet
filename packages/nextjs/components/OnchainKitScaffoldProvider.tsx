import { PropsWithChildren } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import { useAccount } from "wagmi";

export const OnchainKitScaffoldProvider = ({ children }: PropsWithChildren) => {
  const { chain } = useAccount();

  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
      chain={(chain as any) || base}
    >
      {children}
    </OnchainKitProvider>
  );
};
