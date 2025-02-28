import { Network } from "alchemy-sdk";
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  alchemySDKChains: Record<string, Network>;
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [
    chains.mainnet,
    chains.polygon,
    chains.optimism,
    chains.arbitrum,
    chains.base,
    chains.sepolia,
    chains.optimismSepolia,
    chains.baseSepolia,
  ],

  alchemySDKChains: {
    [chains.mainnet.id]: Network.ETH_MAINNET,
    [chains.polygon.id]: Network.MATIC_MAINNET,
    [chains.optimism.id]: Network.OPT_MAINNET,
    [chains.arbitrum.id]: Network.ARB_MAINNET,
    [chains.base.id]: Network.BASE_MAINNET,
    // Tests networks
    [chains.sepolia.id]: Network.ETH_SEPOLIA,
    [chains.optimismSepolia.id]: Network.OPT_SEPOLIA,
    [chains.baseSepolia.id]: Network.BASE_SEPOLIA,
  },

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
