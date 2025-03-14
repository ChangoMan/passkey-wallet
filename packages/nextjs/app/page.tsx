"use client";

import { useAccount } from "wagmi";
import { History } from "~~/components/burnerwallet/History";
import { useGetHistory } from "~~/hooks/useGetHistory";

export default function Home() {
  const { address: connectedAddress = "" } = useAccount();
  const { chainId, isLoading, history } = useGetHistory({ address: connectedAddress });

  return (
    <div className="max-w-xl mx-auto">
      <section className="px-3 pb-28 pt-2 divide-y">
        {connectedAddress && <History chainId={chainId} history={history} isLoading={isLoading} />}
      </section>
    </div>
  );
}
