import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { RootState } from "src/Store";
import { useEffect, useState } from "react";
import { IProfile } from "src/types/interfaces";
import { writeProfileToServer } from "src/server/glokiAPI";
import Loader from "src/components/ui/loader/Loader";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import ShareContract from "../share/ShareContract";

const ProfilePage = () => {
  const { agent, server, profile, contract } = useSelector(
    (state: RootState) => {
      return state.gloki;
    }
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({} as IProfile);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (profile && Object.keys(profile).length === 0) {
      setIsEditMode(true); // Start in edit mode if no data
    }
  }, [profile]);

  const handleSave = () => {
    if (agent && server && contract) {
      writeProfileToServer(server, agent, contract, updatedProfile);
    }
    setIsEditMode(false);
  };

  if (!profile && !isEditMode) return <Loader></Loader>;

  return (
    <div className={styles["profile-container"]}>
      {isEditMode ? (
        <EditProfile setUpdatedProfile={setUpdatedProfile}>
          <div className={styles["command-buttons"]}>
            <button onClick={handleSave}>save</button>
          </div>
        </EditProfile>
      ) : showDialog ? (
        <ShareContract setClose={() => setShowDialog(false)} contractProp={contract}></ShareContract>
      ) : (
        <ViewProfile>
          <div className={styles["command-buttons"]}>
            <button onClick={() => setIsEditMode(true)}>Edit</button>
            <button onClick={() => setShowDialog(true)}>Share</button>
            <button>Settings</button>
          </div>
        </ViewProfile>
      )}
    </div>
  );
};

export default ProfilePage;
