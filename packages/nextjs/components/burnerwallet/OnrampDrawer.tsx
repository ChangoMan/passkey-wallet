import { PayEmbed } from "thirdweb/react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { client } from "~~/app/client";
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
        <div className="flex flex-col items-center gap-4 mb-4 px-4">
          <PayEmbed client={client} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
