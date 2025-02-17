import { Scanner } from "@yudiel/react-qr-scanner";
import styles from "./QrScan.module.scss";
import { IContract, IInvite } from "src/types/interfaces";
import {
  uint8ArrayToHex,
  uint8ArrayToString,
  stringToUint8Array,
} from "src/utils/encodeDecode";
import { addContactToServer, PROFILE_CONTRACT_NAME } from "src/server/glokiAPI";
import { useSelector } from "react-redux";
import { RootState } from "src/Store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgentContract } from "src/server/agent";
import { communityContractType, ECommunityType, joinCommunityContract } from "src/server/communityAPI";

const QrScan = () => {
  const { agent, server, contract } = useSelector((state: RootState) => {
    return state?.gloki;
  });
  const [invite, setInvite] = useState({} as IInvite);
  const [contractObject, setContractObject] = useState({} as IContract);
  const navigate = useNavigate();

  const handleResult = async (data: string) => {
    const result = stringToUint8Array(data, "latin1");
    const indexes = result
      .slice(0, 3)
      .reduce((acc, curr) => [...acc, acc[acc.length - 1] + curr], [3]);
    const newInvite = {
      server: uint8ArrayToString(result.slice(indexes[0], indexes[1]), "ascii"),
      agent: uint8ArrayToHex(result.slice(indexes[1], indexes[2])),
      contract: uint8ArrayToHex(result.slice(indexes[2], indexes[3])),
    } as IInvite;
    if (newInvite.contract) {
      const newContractObject = await getAgentContract(
        newInvite.server,
        newInvite.agent,
        newInvite.contract
      );
      if (newContractObject) {
        setContractObject(newContractObject);
        setInvite(newInvite);
      }
    }
  };

  const handleApprove = () => {
    if (server && agent && contract && invite.contract && contractObject) {
      switch (contractObject.contract) {
        case communityContractType[ECommunityType.GossipCommunity]:
        case communityContractType[ECommunityType.WotCommunity]:
          joinCommunityContract(server, agent, invite);
          break;
        case PROFILE_CONTRACT_NAME:
          addContactToServer(server, agent, contract, {
            server: invite.server,
            agent: invite.agent,
            contract: invite.contract,
          });
          break;
      }
    }
  };

  const inviteExists = Object.keys(invite).length > 0;

  return (
    <>
      <div className={styles["box"]}>
        <Scanner onScan={(result) => handleResult(result[0].rawValue)} />
      </div>
      {inviteExists && contractObject && (
        <>
          <div>
            You received an invitation to join contract {contractObject.name} of
            type {contractObject.contract}
          </div>
          <button onClick={handleApprove}>Approve</button>
        </>
      )}
    </>
  );
};

export default QrScan;

// https://www.npmjs.com/package/react-webcam
