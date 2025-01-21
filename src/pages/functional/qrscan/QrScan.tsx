import { Scanner } from "@yudiel/react-qr-scanner";
import styles from "./QrScan.module.scss";
import { IInvite } from "src/types/interfaces";
import {
  uint8ArrayToHex,
  uint8ArrayToString,
  stringToUint8Array,
} from "src/utils/encodeDecode";
import { addContactToServer } from "src/server/glokiAPI";
import { useSelector } from "react-redux";
import { RootState } from "src/Store";
import { FC, useState } from "react";
import { EMainPage } from "src/types/enums";

interface QrScanProps {
  setCurrentView: (view: EMainPage) => void;
}

const QrScan: FC<QrScanProps>  = ({setCurrentView}) => {
  const { agent, server, contract } = useSelector((state: RootState) => {
    return state?.gloki;
  });
  const [invite, setInvite] = useState({} as IInvite);

  const handleResult = (data: string) => {
    const result = stringToUint8Array(data, "latin1");
    const indexes = result
      .slice(0, 4)
      .reduce((acc, curr) => [...acc, acc[acc.length - 1] + curr], [4]);
    const newInvite = {
      server: uint8ArrayToString(result.slice(indexes[0], indexes[1]), "ascii"),
      agent: uint8ArrayToHex(result.slice(indexes[1], indexes[2])),
      contract: uint8ArrayToHex(result.slice(indexes[2], indexes[3])),
      name: uint8ArrayToString(result.slice(indexes[3], indexes[4]), "utf8"),
    } as IInvite;
    setInvite(newInvite);
  };

  const handleApprove = () => {
    if (server && agent && contract && invite.contract) {
      addContactToServer(server, agent, contract, {
        server: invite.server,
        agent: invite.agent,
        contract: invite.contract,
      });
    }
    setCurrentView(EMainPage.Favorites);
  };

  const inviteExists = Object.keys(invite).length > 0;

  return (
    <>
      <div className={styles["box"]}>
        <Scanner onScan={(result) => handleResult(result[0].rawValue)} />
      </div>
      {inviteExists &&
        (invite.name && invite.name.trim().length > 0 ? (
          <>
            <div>
              You received an invitation from {invite.name} to join their
              network
            </div>
            <button onClick={handleApprove}>Approve</button>
          </>
        ) : (
          <div>This QR-Code has no name on it. Scan another one</div>
        ))}
    </>
  );
};

export default QrScan;

// https://www.npmjs.com/package/react-webcam
