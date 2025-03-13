"use client";

import Link from "next/link";
import { useDisconnect } from "wagmi";
import {
  ChartPieIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  HeartIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~~/components/Drawer";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { useGlobalState } from "~~/services/store/store";

export const SettingsDrawer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { disconnect } = useDisconnect();

  return (
    <Drawer direction="left">
      <DrawerTrigger className="px-1 btn btn-sm btn-ghost text-white">
        <Cog6ToothIcon className="w-6" />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col h-full w-[85%] md:w-[400px] fixed bottom-0 left-0 rounded-tl-none">
        <DrawerHeader className="grid grid-cols-3 items-center gap-0">
          <DrawerClose className="btn btn-sm btn-circle btn-ghost">
            <ChevronLeftIcon className="w-6 h-6" />
          </DrawerClose>
          <DrawerTitle className="m-0 text-xl md:text-2xl">Settings</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col px-6 mt-1 divide-y divide-border-muted bg-base-200">
          <div className="flex items-center justify-between pb-3">
            Dark Mode <SwitchTheme />
          </div>
          <div className="py-3">
            <Link
              href="https://wallet.coinbase.com/assets"
              className="inline-block hover:text-accent hover:underline"
              target="_blank"
            >
              <ChartPieIcon className="inline-block w-5 h-5 -mt-1 mr-2" /> View All Assets
            </Link>
          </div>
          <div className="py-3">
            <Link
              href="https://help.coinbase.com/en/wallet/getting-started/smart-wallet-recovery"
              className="inline-block hover:text-accent hover:underline"
              target="_blank"
            >
              <LockClosedIcon className="inline-block w-5 h-5 -mt-1 mr-2" /> Smart Wallet Recovery
            </Link>
          </div>
          <div className="pt-4">
            <button className="btn btn-sm btn-error btn-outline" onClick={() => disconnect()}>
              Disconnect Wallet
            </button>
          </div>
        </div>
        <DrawerFooter className="pb-4 gap-2 bg-base-200">
          {nativeCurrencyPrice > 0 && (
            <div>
              <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>{nativeCurrencyPrice}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <p className="m-0 text-sm">
              Built with <HeartIcon className="inline-block h-4 w-4" /> at
            </p>
            <a
              className="flex justify-center items-center gap-1"
              href="https://buidlguidl.com/"
              target="_blank"
              rel="noreferrer"
            >
              <BuidlGuidlLogo className="w-3 h-5 pb-1" />
              <span className="link">BuidlGuidl</span>
            </a>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
