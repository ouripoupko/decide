import store from "src/Store";
import { getContacts, readProfile } from "./GlokiSlice";
import { readCommunities } from "./communitiesSlice";

interface IListener {
  [contract: string]: () => void;
}

export const callbackRegistry = {
  onJoin: {} as IListener,
  onDeploy: {} as IListener,
  onWrite: {} as IListener,
};

export function serverlistener(data: string) {
  const currentState = store.getState();

  if (data.trim() !== "") {
    const message = JSON.parse(data);
    console.log(message);
    switch (message.action) {
      case "contract_write":
        if (message.contract === currentState.gloki.contract) {
          store.dispatch(readProfile());
          store.dispatch(getContacts());
        }
        break;
      case "deploy_contract":
        store.dispatch(readCommunities());
        break;
      case "a2a_connect":
        callbackRegistry.onJoin[message.contract]?.();
        delete callbackRegistry.onJoin[message.contract];
        break;
    }
  }
}
