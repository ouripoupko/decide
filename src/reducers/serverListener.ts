import store from "src/Store";
import { getContacts, readProfile } from "./GlokiSlice";

export function serverlistener(data: string) {
  const currentState = store.getState();
  
  if (data.trim() !== "") {
    const message = JSON.parse(data);
    switch (message.action) {
      case "contract_write":
        if (message.contract === currentState.gloki.contract) {
          store.dispatch(readProfile());
          store.dispatch(getContacts());
        }
        break;
    }
  }
}
