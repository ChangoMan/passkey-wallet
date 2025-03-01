import Link from "next/link";
import { Earn } from "@coinbase/onchainkit/earn";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Drawer, DrawerContent, DrawerHeader, DrawerLine, DrawerTitle, DrawerTrigger } from "~~/components/Drawer";

export const EarnDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="btn btn-neutral bg-white/50">
        <CurrencyDollarIcon className="w-6" /> Earn
      </DrawerTrigger>
      <DrawerContent>
        <DrawerLine />
        <DrawerHeader>
          <DrawerTitle className="mt-1 text-2xl">Earn Interest</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center mb-4 px-4">
          <Earn vaultAddress="0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A" />
          <p className="text-center">
            Earn interest on your USDC stablecoin, powered by{" "}
            <Link
              className="underline hover:no-underline"
              href="https://app.morpho.org/base/vault/0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A/spark-usdc-vault"
              target="_blank"
            >
              Morpho
            </Link>
            .
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
