import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  isQrReaderOpen: boolean;
  setIsQrReaderOpen: (newValue: boolean) => void;
  sendEthToAddress: string;
  setSendEthToAddress: (newValue: string) => void;
  isTransactionConfirmOpen: boolean;
  setIsTransactionConfirmOpen: (newValue: boolean) => void;
  isSendDrawerOpen: boolean;
  setIsSendDrawerOpen: (newValue: boolean) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
  isQrReaderOpen: false,
  setIsQrReaderOpen: (newValue: boolean): void => set(() => ({ isQrReaderOpen: newValue })),
  sendEthToAddress: "",
  setSendEthToAddress: (newValue: string): void => set(() => ({ sendEthToAddress: newValue })),
  isTransactionConfirmOpen: false,
  setIsTransactionConfirmOpen: (newValue: boolean): void => set(() => ({ isTransactionConfirmOpen: newValue })),
  isSendDrawerOpen: false,
  setIsSendDrawerOpen: (newValue: boolean): void => set(() => ({ isSendDrawerOpen: newValue })),
}));
