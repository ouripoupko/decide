import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Communities.module.scss";
import { readCommunities } from "src/reducers/CommunitySlice";
import { AppDispatch, RootState } from "src/Store";
import {
  deployCommunityToServer,
  ECommunityType,
} from "src/server/communityAPI";
import { useNavigate } from "react-router-dom";

const ItemsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const communities = useSelector((state: RootState) => state.communities.contracts);
  const { agent, server } = useSelector((state: RootState) => state.gloki);

  const [newItemName, setNewItemName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(readCommunities());
  }, [dispatch]);

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;

    try {
      if (server && agent) {
        await deployCommunityToServer(
          server,
          agent,
          newItemName,
          ECommunityType.GossipCommunity
        );
      }
      setNewItemName(""); // Clear input after successful add
      dispatch(readCommunities()); // Refresh the list
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <input
          type="text"
          className={styles.input}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <button className={styles.addButton} onClick={handleAddItem}>
          Add
        </button>
      </div>
      <ul className={styles.list}>
        {communities.map((item, index) => (
          <li key={index} className={styles.listItem} onClick={()=>navigate(`/community/${item.id}`)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
