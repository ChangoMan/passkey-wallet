"use client";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="relative overflow-hidden">
      {connectedAddress && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Jazzicon
            diameter={600}
            paperStyles={{
              borderRadius: 0,
            }}
            seed={jsNumberForAddress(connectedAddress)}
          />
        </div>
      )}
      <div className="relative z-10 p-6 glass">
        <div className="flex justify-between items-center mb-6">
          {/* <SettingsDrawer /> */}
          <div className="flex">
            {/* <NetworksDropdown
              onChange={option => switchNetwork?.(option.value)}
              value={chain ? chain.id : networks[0].id}
            /> */}
          </div>
        </div>
        <div className="text-white">
          <Address address={connectedAddress} disableAddressLink size="base" format="short" />
          <div className="mt-8 mb-10 flex justify-center">
            <Balance className="text-6xl" address={connectedAddress} usdMode />
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* <ReceiveDrawer address={connectedAddress} /> */}
          {/* <SendDrawer address={connectedAddress} updateHistory={updateHistory} /> */}
        </div>
      </div>
    </div>
  );
};
