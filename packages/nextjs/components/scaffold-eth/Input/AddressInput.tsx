import { useEffect, useState } from "react";
import { blo } from "blo";
import { useDebounceValue } from "usehooks-ts";
import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase, isENS } from "~~/components/scaffold-eth";
import ScanIcon from "~~/icons/ScanIcon";
import { useGlobalState } from "~~/services/store/store";

/**
 * Address input with ENS name resolution
 */
export const AddressInput = ({ value, name, placeholder, onChange, disabled }: CommonInputProps<Address | string>) => {
  // Debounce the input to keep clean RPC calls when resolving ENS names
  // If the input is an address, we don't need to debounce it
  const [_debouncedValue] = useDebounceValue(value, 500);
  const debouncedValue = isAddress(value) ? value : _debouncedValue;
  const isDebouncedValueLive = debouncedValue === value;

  // If the user changes the input after an ENS name is already resolved, we want to remove the stale result
  const settledValue = isDebouncedValueLive ? debouncedValue : undefined;

  const setIsQrReaderOpen = useGlobalState(state => state.setIsQrReaderOpen);

  const {
    data: ensAddress,
    isLoading: isEnsAddressLoading,
    isError: isEnsAddressError,
    isSuccess: isEnsAddressSuccess,
  } = useEnsAddress({
    name: settledValue,
    chainId: 1,
    query: {
      gcTime: 30_000,
      enabled: isDebouncedValueLive && isENS(debouncedValue),
    },
  });

  const [enteredEnsName, setEnteredEnsName] = useState<string>();
  const {
    data: ensName,
    isLoading: isEnsNameLoading,
    isError: isEnsNameError,
    isSuccess: isEnsNameSuccess,
  } = useEnsName({
    address: settledValue as Address,
    chainId: 1,
    query: {
      enabled: isAddress(debouncedValue),
      gcTime: 30_000,
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
      gcTime: 30_000,
    },
  });

  // ens => address
  useEffect(() => {
    if (!ensAddress) return;

    // ENS resolved successfully
    setEnteredEnsName(debouncedValue);
    onChange(ensAddress);
  }, [ensAddress, onChange, debouncedValue]);

  useEffect(() => {
    setEnteredEnsName(undefined);
  }, [value]);

  const reFocus =
    isEnsAddressError ||
    isEnsNameError ||
    isEnsNameSuccess ||
    isEnsAddressSuccess ||
    ensName === null ||
    ensAddress === null;

  const avatarStyles = "rounded-full border-2 border-white shadow-md";

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      {value && !ensAvatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" className={avatarStyles} src={blo(value as `0x${string}`)} width={96} height={96} />
      )}
      {ensAvatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={`${ensAddress} avatar`} className={avatarStyles} src={ensAvatar} width={96} height={96} />
      )}
      {!value && !ensAvatar && <div className={`${avatarStyles} w-24 h-24 bg-slate-300`}></div>}
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex-1">
          <InputBase<Address>
            name={name}
            placeholder={placeholder}
            error={ensAddress === null}
            value={value as Address}
            onChange={onChange}
            disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
            reFocus={reFocus}
            prefix={
              ensName && (
                <div className="flex bg-accent text-accent-content rounded-l-md items-center">
                  <span className="px-2">{enteredEnsName ?? ensName}</span>
                </div>
              )
            }
          />
        </div>
        <button
          className="shrink-0 w-12 h-12 bg-accent text-accent-content rounded-lg"
          onClick={() => setIsQrReaderOpen(true)}
        >
          <ScanIcon width="28" height="28" className="mx-auto" />
        </button>
      </div>
    </div>
  );
};
