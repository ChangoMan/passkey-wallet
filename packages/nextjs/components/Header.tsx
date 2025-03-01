"use client";

import { RandomLoadingBackground } from "./RandomLoadingBackground";
import { EarnDrawer } from "./burnerwallet/EarnDrawer";
import { coinbaseWallet } from "@wagmi/connectors";
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
  const { address: connectedAddress, chain } = useAccount();
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
      {!connectedAddress && <RandomLoadingBackground />}
      <div className="relative z-10 p-6 glass">
        {connectedAddress && (
          <>
            <div className="flex justify-between items-center mb-6">
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
              <Address address={connectedAddress} disableAddressLink size="base" format="short" />
              <div className="mt-8 mb-10 flex justify-center">
                <Balance className="text-6xl" address={connectedAddress} usdMode />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <ReceiveDrawer address={connectedAddress} />
              {!hasNoBalance && !isLoading && <SendDrawer address={connectedAddress} updateHistory={updateHistory} />}
              <EarnDrawer />
              {/* {hasNoBalance && (
                <FundButton
                  className="btn btn-neutral bg-white/50 text-[0.875rem] font-semibold gap-0 leading-none"
                  text="Fund Wallet"
                />
              )} */}
            </div>
          </>
        )}
        {!connectedAddress && (
          <>
            <div className="flex items-center justify-center min-h-80 text-center">
              <div>
                <h1 className="text-3xl font-medium">Smart Burner Wallet</h1>
                <p className="text-lg">
                  Quickly create and manage a smart wallet using a passkey. Backed by enterprise-grade security with
                  Coinbase.
                </p>
                <button
                  className="mt-4 btn btn-lg btn-primary"
                  onClick={() =>
                    connect({
                      connector: coinbaseWallet({
                        appName: "Passkey Wallet",
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
      </div>
    </div>
  );
};
