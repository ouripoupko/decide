import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

export default function QRCode() {
  const [url, setUrl] = useState("https://qr-code-styling.com");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current || undefined);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  return (
    <div className="App">
      <div ref={ref} />
    </div>
  );
}
