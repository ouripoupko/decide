import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { AppDispatch, RootState } from "src/Store";
import copyIcon from "../../../../src/assets/icons/Copy_Icon.svg";
import { useEffect, useState } from "react";
import { readProfile } from "src/reducers/AgentSlice";
import { IProfile } from "src/types/interfaces";
import { writeProfileToServer } from "src/server/gloki";
import Loader from "src/components/ui/loader/Loader";

const ProfilePage = () => {
  const { agent, server, profile, contract } = useSelector(
    (state: RootState) => {
      return state?.agent;
    }
  );
  const { userPhoto, firstName, lastName, userBio } = profile || {};

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({} as IProfile);

  const dispatch: AppDispatch = useDispatch();

  console.log("rendering profile page", profile);

  //               this.listenService.register(this.contract, 'contract_write', _ => this.readProfile());

  // Fetch user data on mount
  useEffect(() => {
    if (contract) {
      dispatch(readProfile());
    }
  }, [dispatch, contract]);

  useEffect(() => {
    console.log("check if empty", profile);
    if (profile && Object.keys(profile).length === 0) {
      console.log("set edit mode");
      setIsEditMode(true); // Start in edit mode if no data
    }
  }, [profile]);

  const handleSave = () => {
    if (agent && server && contract) {
      writeProfileToServer(server, agent, contract, updatedProfile);
    }
    setIsEditMode(false);
  };

  const updateFirstName = (newFirstName: string) => {
    setUpdatedProfile((updatedProfile) => ({
      ...updatedProfile,
      firstName: newFirstName,
    }));
  };

  const updateLastName = (newLastName: string) => {
    setUpdatedProfile((updatedProfile) => ({
      ...updatedProfile,
      lastName: newLastName,
    }));
  };

  const updateBio = (newBio: string) => {
    setUpdatedProfile((updatedProfile) => ({
      ...updatedProfile,
      userBio: newBio,
    }));
  };

  // const updateFirstName = (newFirstName: string) => {
  //   setUpdatedProfile(updatedProfile => ({ ...updatedProfile, firstName: newFirstName }));
  // };

  if (!profile && !isEditMode) return <Loader></Loader>;

  return (
    <div className={styles["profile-container"]}>
      {userPhoto ? (
        <img
          className={styles["image-container"]}
          src={userPhoto}
          alt="Profile"
        ></img>
      ) : (
        <div className={styles["image-container"]}></div>
      )}
      {isEditMode ? (
        <>
          <input onChange={(e) => updateFirstName(e.target.value)}></input>
          <input onChange={(e) => updateLastName(e.target.value)}></input>
        </>
      ) : (
        <div className={styles["agent-name"]}>
          {firstName || ""} {lastName || ""}
        </div>
      )}
      <div className={styles["command-buttons"]}>
        {isEditMode ? (
          <button onClick={handleSave}>save</button>
        ) : (
          <button onClick={() => setIsEditMode(true)}>Edit</button>
        )}
        <button>Share</button>
        <button>Settings</button>
      </div>
      <div className={styles["profile-fields"]}>
        <div className={styles["field-title"]}>Bio</div>
        {isEditMode ? (
          <textarea onChange={(e) => updateBio(e.target.value)}></textarea>
        ) : userBio ? (
          <div className={styles["field-paragraph"]}>{userBio}</div>
        ) : (
          <div className={styles["field-paragraph"]}>
            You can write your bio here
          </div>
        )}
        {!isEditMode && (
          <>
            <div className={styles["field-title"]}>
              <span>gloKi</span>&emsp;
              <span className={styles["info"]}>?</span>
            </div>
            <div className={styles["field-invert"]}>
              <div className={styles["field-text"]}>{agent || ""}</div>
              <img src={copyIcon} alt="copy icon"></img>
            </div>
            <div className={styles["field-title"]}>
              <span>Storage</span>&emsp;
              <span className={styles["info"]}>?</span>
            </div>
            <div className={styles["field-invert"]}>
              <div className={styles["field-text"]}>{server || ""}</div>
              <img src={copyIcon} alt="copy icon"></img>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
