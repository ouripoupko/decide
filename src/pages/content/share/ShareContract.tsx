import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import QRCode from "src/components/ui/qrcode/QRCode";
import { RootState } from "src/Store";
import { ContainerContextType } from "src/types/types";
import {
  concatUint8Arrays,
  hexToUint8Array,
  uint8ArrayToString,
  stringToUint8Array,
} from "src/utils/encodeDecode";

type ShareContractProps = {
  setClose?: () => void;
  contractProp?: string;
};

export default function ShareContract({
  setClose,
  contractProp
}: ShareContractProps) {
  const { agent, server } = useSelector((state: RootState) => {
    return state?.gloki;
  });
  const contract = contractProp ?? useOutletContext<ContainerContextType>()?.contract;

  const encodeInvitation = () => {
    const s = stringToUint8Array(server || "");
    const a = hexToUint8Array(agent || "");
    const c = hexToUint8Array(contract || "");
    const lengths = new Uint8Array([s.length, a.length, c.length]);
    const all = concatUint8Arrays([lengths, s, a, c]);
    return uint8ArrayToString(all, "latin1");
  };

  return (
    <div>
      <div onClick={setClose}>X</div>
      <QRCode code={encodeInvitation()}></QRCode>
    </div>
  );
}
