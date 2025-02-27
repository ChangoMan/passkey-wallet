"use client";

import { coinbaseWallet } from "@wagmi/connectors";
import type { NextPage } from "next";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="flex justify-center items-center flex-col gap-4">
            <button
              className="btn btn-primary"
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
              Connect
            </button>
            <button className="btn btn-error btn-outline" onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
