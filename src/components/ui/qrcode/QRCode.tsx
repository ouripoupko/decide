import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import glokiKey from "src/assets/icons/Key.svg"

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: glokiKey,
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 4
  }
});

type QRCodeProps = {
  code: string;
}

export default function QRCode({code}: QRCodeProps) {
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current || undefined);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: code
    });
  }, [code]);

  return (
    <div className="App">
      <div ref={ref} />
    </div>
  );
}
