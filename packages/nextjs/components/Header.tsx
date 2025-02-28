"use client";

import { coinbaseWallet } from "@wagmi/connectors";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useLocalStorage } from "usehooks-ts";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { NetworksDropdown } from "~~/components/NetworksDropdown";
import { ReceiveDrawer } from "~~/components/burnerwallet/ReceiveDrawer";
import { SendDrawer } from "~~/components/burnerwallet/SendDrawer";
import { SettingsDrawer } from "~~/components/burnerwallet/SettingsDrawer";
import { Address, Balance } from "~~/components/scaffold-eth";
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
            <div className="flex items-center justify-center gap-6 mt-6">
              <ReceiveDrawer address={connectedAddress} />
              <SendDrawer address={connectedAddress} updateHistory={updateHistory} />
            </div>
          </>
        )}
        {!connectedAddress && (
          <div className="text-center">
            <button
              className="btn btn-lg btn-primary"
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
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
