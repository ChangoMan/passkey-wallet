"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

// Addresses to cycle through
const ADDRESSES = [
  "0x815E0023A28AA56ae60148B3781D783b223953B6",
  "0xa63Bfd6492Ed2098e417fe2A7dE30d39d9CbC102",
  "0xb5C23229fB8462c1658F40d97a11D94feB57e223",
  "0x9E9be8440794f28Ac08e13ec290B688520a5D824",
  "0xf1eBd160b9751632DfFB647d871685885ABDe22D",
  "0xBF791a193565F80276D26962A25b429043aE6253",
  "0xA55bBD4Ddf0C03C53c3F3b6964328c996F0f893d",
  "0xE3F3Acda31De82C4bC3d3070F519906bDFc497e4",
];

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative"
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      initial={{ opacity: 0.5, scale: 0.5, left: 200 }}
      animate={{ opacity: 1, scale: 1, left: 0 }}
      exit={{ opacity: 0.5, scale: 0.5, left: -200 }}
    >
      {children}
    </motion.div>
  );
};

export const RandomLoadingBackground = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 4) {
        setCount(0);
        return;
      }

      setCount(count + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-70">
      <AnimatePresence>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index}>
            {count === index && (
              <MotionWrapper>
                <Jazzicon
                  diameter={600}
                  paperStyles={{
                    borderRadius: 0,
                  }}
                  seed={jsNumberForAddress(ADDRESSES[index])}
                />
              </MotionWrapper>
            )}
          </div>
        ))}
      </AnimatePresence>
      {/* <Jazzicon
        diameter={600}
        paperStyles={{
          borderRadius: 0,
        }}
        seed={jsNumberForAddress(ADDRESSES[1])}
      />
      <Jazzicon
        diameter={600}
        paperStyles={{
          borderRadius: 0,
        }}
        seed={jsNumberForAddress(ADDRESSES[2])}
      />
      <Jazzicon
        diameter={600}
        paperStyles={{
          borderRadius: 0,
        }}
        seed={jsNumberForAddress(ADDRESSES[3])}
      />
      <Jazzicon
        diameter={600}
        paperStyles={{
          borderRadius: 0,
        }}
        seed={jsNumberForAddress(ADDRESSES[4])}
      /> */}
    </div>
  );
};
