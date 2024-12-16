import { Scanner } from "@yudiel/react-qr-scanner";
import styles from "./QrScan.module.scss";

const QrScan = () => {
  return (
    <div className={styles["box"]}>
      <Scanner
        onScan={(result) => console.log(result)}
      />
    </div>
  );
};

export default QrScan;

// https://www.npmjs.com/package/react-webcam