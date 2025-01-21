import { useSelector } from "react-redux";
import { RootState } from "src/Store";
import styles from "./Profile.module.scss";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { IProfile } from "src/types/interfaces";

type EditProfileProps = {
  children?: ReactNode;
  setUpdatedProfile: Dispatch<SetStateAction<IProfile>>;
};

export default function EditProfile({
  children,
  setUpdatedProfile,
}: EditProfileProps) {
  const { profile } = useSelector((state: RootState) => {
    return state?.gloki;
  });
  const { userPhoto, firstName, lastName, userBio } = profile || {};

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

  return (
    <>
      {userPhoto ? (
        <img
          className={styles["image-container"]}
          src={userPhoto}
          alt="Profile"
        ></img>
      ) : (
        <div className={styles["image-container"]}></div>
      )}
      <input
        onChange={(e) => updateFirstName(e.target.value)}
        defaultValue={firstName}
      ></input>
      <input
        onChange={(e) => updateLastName(e.target.value)}
        defaultValue={lastName}
      ></input>

      {
        // the buttons
        children
      }

      <div className={styles["profile-fields"]}>
        <div className={styles["field-title"]}>Bio</div>
        <textarea
          onChange={(e) => updateBio(e.target.value)}
          defaultValue={userBio}
        ></textarea>
      </div>
    </>
  );
}
