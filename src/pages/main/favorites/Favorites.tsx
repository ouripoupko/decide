import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "src/reducers/GlokiSlice";
import { AppDispatch, RootState } from "src/Store";

export default function Favorites() {
  const {contract, contacts} = useSelector((state: RootState) => state.gloki);

  const dispatch: AppDispatch = useDispatch();

  // Fetch user data on mount
  useEffect(() => {
    if (contract) {
      dispatch(getContacts());
    }
  }, [dispatch, contract]);

  return (
    <><h1>Contacts:</h1>
      {contacts?.map((contact) => (
        <div key={contact.agent}>{contact.agent}</div>
      ))}
    </>
  );
}
