import { useSelector } from "react-redux";
import { RootState } from "src/Store";

export default function Favorites() {
  const { contacts } = useSelector((state: RootState) => state.gloki);

  return (
    <>
      <h1>Contacts:</h1>
      {contacts?.map((contact) => (
        <div key={contact.agent}>{contact.agent}</div>
      ))}
    </>
  );
}
