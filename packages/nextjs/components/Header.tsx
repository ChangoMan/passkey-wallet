"use client";

import { RandomLoadingBackground } from "./RandomLoadingBackground";
import { EarnDrawer } from "./burnerwallet/EarnDrawer";
import { OnrampDrawer } from "./burnerwallet/OnrampDrawer";
import { coinbaseWallet } from "@wagmi/connectors";
import clsx from "clsx";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useLocalStorage } from "usehooks-ts";
import { formatEther } from "viem";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { NetworksDropdown } from "~~/components/NetworksDropdown";
import { ReceiveDrawer } from "~~/components/burnerwallet/ReceiveDrawer";
import { SendDrawer } from "~~/components/burnerwallet/SendDrawer";
import { SettingsDrawer } from "~~/components/burnerwallet/SettingsDrawer";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const SCAFFOLD_CHAIN_ID_STORAGE_KEY = "scaffoldEth2.chainId";
const networks = getTargetNetworks();

type HeaderProps = {
  updateHistory: () => void;
};

/**
 * Site header
 */
export const Header = ({ updateHistory }: HeaderProps) => {
  const setChainId = useLocalStorage<number>(SCAFFOLD_CHAIN_ID_STORAGE_KEY, networks[0].id)[1];
  const { address: connectedAddress, chain, status } = useAccount();
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();
  const {
    data: balance,
    isError,
    isFetched,
    isLoading,
  } = useWatchBalance({
    address: connectedAddress,
  });

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;
  const hasNoBalance = isFetched && !isError && formattedBalance === 0;

  const isBase = chain?.id === 8453;

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
      {status !== "connected" && <RandomLoadingBackground />}
      <div className="relative z-10 py-6 glass">
        {status === "connected" && (
          <>
            <div className="flex justify-between items-center mb-6 px-4">
              <SettingsDrawer />
              <div className="flex">
                <NetworksDropdown
                  onChange={option => {
                    switchChain(
                      { chainId: option.value },
                      {
                        onSuccess(data) {
                          setChainId(data.id);
                        },
                      },
                    );
                  }}
                  value={chain ? chain.id : networks[0].id}
                />
              </div>
            </div>
            <div className="text-white">
              <Address address={connectedAddress} size="base" format="short" disableAddressLink onlyEnsOrAddress />
              <div className="my-5 flex justify-center">
                <Balance className="text-6xl" address={connectedAddress} usdMode />
              </div>
            </div>
            <div
              className={clsx(
                "px-4 flex items-center gap-2 mt-6 overflow-auto",
                isBase ? "justify-start sm:justify-center" : "justify-center",
              )}
            >
              <ReceiveDrawer address={connectedAddress} />
              <OnrampDrawer />
              {!hasNoBalance && !isLoading && <SendDrawer address={connectedAddress} updateHistory={updateHistory} />}
              {isBase && <EarnDrawer />}
            </div>
          </>
        )}
        {status === "disconnected" && (
          <>
            <div className="flex items-center justify-center min-h-80 text-center">
              <div className="px-2">
                <h1 className="text-3xl font-medium [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]">Instant Wallet</h1>
                <p className="text-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]">
                  Quickly create and manage an Ethereum wallet using your fingerprint. Backed by enterprise-grade
                  security with Coinbase.
                </p>
                <button
                  className="mt-4 btn btn-lg btn-primary"
                  onClick={() =>
                    connect({
                      connector: coinbaseWallet({
                        appName: "Instant Wallet",
                        preference: {
                          options: "smartWalletOnly",
                        },
                      }),
                    })
                  }
                >
                  Get Started
                </button>
              </div>
            </div>
          </>
        )}
        {(status === "reconnecting" || status === "connecting") && (
          <div className="flex items-center justify-center min-h-72 text-center"></div>
        )}
      </div>
    </div>
  );
};
