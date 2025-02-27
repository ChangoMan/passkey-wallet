import { coinbaseWallet } from "@wagmi/connectors";
import { Chain, createClient, fallback, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { cookieStorage, createConfig, createStorage } from "wagmi";
import scaffoldConfig, { DEFAULT_ALCHEMY_API_KEY } from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const { targetNetworks } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: [
    coinbaseWallet({
      appName: "Passkey Wallet",
      preference: {
        options: "smartWalletOnly",
      },
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  client({ chain }) {
    let rpcFallbacks = [http()];

    const alchemyHttpUrl = getAlchemyHttpUrl(chain.id);
    if (alchemyHttpUrl) {
      const isUsingDefaultKey = scaffoldConfig.alchemyApiKey === DEFAULT_ALCHEMY_API_KEY;
      // If using default Scaffold-ETH 2 API key, we prioritize the default RPC
      rpcFallbacks = isUsingDefaultKey ? [http(), http(alchemyHttpUrl)] : [http(alchemyHttpUrl), http()];
    }

    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
