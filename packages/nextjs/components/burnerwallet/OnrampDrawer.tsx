import { FundCard } from "@coinbase/onchainkit/fund";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Drawer, DrawerContent, DrawerHeader, DrawerLine, DrawerTitle, DrawerTrigger } from "~~/components/Drawer";

export const OnrampDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="btn btn-neutral bg-white/50">
        <CreditCardIcon className="w-6" /> Buy
      </DrawerTrigger>
      <DrawerContent>
        <DrawerLine />
        <DrawerHeader>
          <DrawerTitle className="mt-1 text-2xl">Buy</DrawerTitle>
        </DrawerHeader>
        <div className="mb-16 px-4 md:w-[32rem] md:mx-auto">
          <FundCard
            assetSymbol="ETH"
            country="US"
            currency="USD"
            presetAmountInputs={["10", "20", "100"]}
            headerText=""
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
