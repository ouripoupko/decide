import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Currency.module.scss";
import { readAccount, readPartners } from "src/reducers/currencySlice";
import { AppDispatch, RootState } from "src/Store";
import {
  joinCurrencyContract,
  setParametersToServer,
  transfer,
} from "src/server/currencyAPI";

const Currency = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const [transferAmount, setTransferAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [burnPreference, setBurnPreference] = useState("");
  const [mintPreference, setMintPreference] = useState("");
  const [joinRequested, setJoinRequested] = useState(false);

  const { server, agent } = useSelector((state: RootState) => state.gloki);
  const communityContract = useSelector(
    (state: RootState) => state.community.contract
  );
  const { invite, contractExists, balance, preferences, parameters, partners } =
    useSelector((state: RootState) => state.currency);

  useEffect(() => {
    console.log("calling readAccount");
    if (communityContract) {
      dispatch(readAccount());
      dispatch(readPartners());
    }
  }, [dispatch, id, communityContract]);

  const handleTransfer = async () => {
    if (!transferAmount || !recipient) return;
    try {
      await transfer(recipient, Number(transferAmount));
      setTransferAmount(""); // Clear input after successful transfer
      dispatch(readAccount()); // Refresh account details
    } catch (error) {
      console.error("Failed to transfer:", error);
    }
  };

  const handleUpdatePreferences = async () => {
    if (server && agent && invite?.contract) {
      try {
        await setParametersToServer(
          server,
          agent,
          invite.contract,
          Number(mintPreference),
          Number(burnPreference)
        );
        dispatch(readAccount()); // Refresh account details
      } catch (error) {
        console.error("Failed to update preferences:", error);
      }
    }
  };

  const joinCurrency = async () => {
    if (server && agent && invite) {
      setJoinRequested(true);
      await joinCurrencyContract(server, agent, invite);
    }
  };

  return contractExists ? (
    <div className={styles.container}>
      <h1 className={styles.header}>Account Balance</h1>
      <div className={styles.balanceSection}>Balance: {balance} coins</div>
      <div className={styles.transferSection}>
        <h2>Transfer Coins</h2>
        <input
          type="number"
          className={styles.input}
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Amount to transfer"
        />
        <select
          className={styles.select}
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          <option value="">Select recipient</option>
          {partners.map((partner) => (
            <option key={partner} value={partner}>
              {partner}
            </option>
          ))}
        </select>
        <button className={styles.button} onClick={handleTransfer}>
          Transfer
        </button>
      </div>

      <div className={styles.parametersSection}>
        <h2>Preferences</h2>
        <div className={styles.parameterRow}>
          <div className={styles.parameterLabel}>Burn:</div>
          <div className={styles.parameterValues}>
            Median: {parameters.burn}, My Preference: {preferences.burn}
          </div>
          <input
            type="number"
            className={styles.input}
            value={burnPreference}
            onChange={(e) => setBurnPreference(e.target.value)}
            placeholder="Set burn preference"
          />
        </div>
        <div className={styles.parameterRow}>
          <div className={styles.parameterLabel}>Mint:</div>
          <div className={styles.parameterValues}>
            Median: {parameters.mint}, My Preference: {preferences.mint}
          </div>
          <input
            type="number"
            className={styles.input}
            value={mintPreference}
            onChange={(e) => setMintPreference(e.target.value)}
            placeholder="Set mint preference"
          />
        </div>
        <button className={styles.button} onClick={handleUpdatePreferences}>
          Update Preferences
        </button>
      </div>
    </div>
  ) : (
    <button disabled={joinRequested} onClick={joinCurrency}>
      Join
    </button>
  );
};

export default Currency;
