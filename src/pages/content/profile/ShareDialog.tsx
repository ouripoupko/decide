import { useSelector } from "react-redux";
import QRCode from "src/components/ui/qrcode/QRCode";
import { RootState } from "src/Store";
import {
  concatUint8Arrays,
  hexToUint8Array,
  uint8ArrayToString,
  stringToUint8Array,
} from "src/utils/encodeDecode";

type ShareDialogProps = {
  setClose: () => void;
};

export default function ShareDialog({ setClose }: ShareDialogProps) {
  const { agent, server, profile, contract } = useSelector(
    (state: RootState) => {
      return state?.gloki;
    }
  );
  const { firstName, lastName } = profile || {};

  const encodeInvitation = () => {
    const s = stringToUint8Array(server || "");
    const a = hexToUint8Array(agent || "");
    const c = hexToUint8Array(contract || "");
    const n = stringToUint8Array(firstName + " " + lastName);
    const lengths = new Uint8Array([s.length, a.length, c.length, n.length]);
    const all = concatUint8Arrays([lengths, s, a, c, n]);
    return uint8ArrayToString(all, "latin1");
  };

  return (
    <div>
      <div onClick={setClose}>X</div>
      <QRCode code={encodeInvitation()}></QRCode>
    </div>
  );
}
