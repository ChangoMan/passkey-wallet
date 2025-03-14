import { useState } from "react";
import dynamic from "next/dynamic";
import { isAddress } from "viem";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

// @ts-ignore
const ReactQrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

// Cleans up extra characters from Coinbase Wallet QR Code.
// Example: https://eips.ethereum.org/EIPS/eip-67
function cleanAddress(result: string) {
  return result.replace("ethereum:", "").split("?")[0];
}

const QrCodeReader = () => {
  const isQrReaderOpen = useGlobalState(state => state.isQrReaderOpen);
  const setIsQrReaderOpen = useGlobalState(state => state.setIsQrReaderOpen);
  const setIsSendDrawerOpen = useGlobalState(state => state.setIsSendDrawerOpen);
  const setToAddress = useGlobalState(state => state.setSendEthToAddress);
  const [isManual, setIsManual] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  const handleScanRead = (result: string) => {
    const address = cleanAddress(result);

    if (result.startsWith("wc:")) {
      setIsQrReaderOpen(false);
      setManualAddress("");
    } else if (isAddress(address)) {
      setToAddress(address);
      setIsQrReaderOpen(false);
      setManualAddress("");
      setIsSendDrawerOpen(true);
    } else {
      notification.error("Invalid address");
    }
  };

  return (
    <>
      {isQrReaderOpen && (
        <>
          {isManual ? (
            <div className="max-w-[90%] w-[300px] h-[300px] fixed top-0 left-0 right-0 bottom-0 m-auto z-[100] text-center">
              <input
                className="input"
                placeholder="Enter address or WC UID"
                value={manualAddress}
                onChange={e => setManualAddress(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={() => handleScanRead(manualAddress)}>
                Submit
              </button>
              <div className="text-center mt-8">
                <button className="btn btn-secondary" onClick={() => setIsManual(false)}>
                  Scan with camera
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-[90%] w-[300px] h-[300px] fixed top-0 left-0 right-0 bottom-0 m-auto z-[100]">
              <button className="block ml-auto mb-1 pointer-events-auto" onClick={() => setIsQrReaderOpen(false)}>
                <XCircleIcon className="w-6 h-6 text-white" />
              </button>
              <ReactQrReader
                // @ts-ignore
                onScan={(result: string) => {
                  if (!!result) {
                    console.info("Scan result", result);
                    handleScanRead(result);
                  }
                }}
                onError={(error: any) => console.log(error)}
                style={{ width: "100%", zIndex: 100 }}
              />
              <div className="text-center mt-8 invisible">
                <button className="btn btn-secondary" onClick={() => setIsManual(true)}>
                  Enter address manually
                </button>
              </div>
            </div>
          )}
          <div className="fixed inset-0 z-[99] bg-black bg-opacity-80" onClick={() => setIsQrReaderOpen(false)} />
        </>
      )}
    </>
  );
};

export { QrCodeReader };
