import QRCode from "src/components/ui/qrcode/QRCode";

type ShareDialogProps = {
  setClose: () => void;
};

export default function ShareDialog({ setClose }: ShareDialogProps) {
  return (
    <div>
      <div onClick={setClose}>X</div>
      <QRCode></QRCode>
    </div>
  );
}
