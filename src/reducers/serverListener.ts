import store from "src/Store";
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
  if (data.trim() !== "") {
    const message = JSON.parse(data);
    console.log(message);
    switch (message.action) {
      case "contract_write":
        callbackRegistry.onWrite[message.contract]?.();
        break;
      case "deploy_contract":
        store.dispatch(readCommunities());
        break;
      case "a2a_connect":
        store.dispatch(readCommunities());
        callbackRegistry.onJoin[message.contract]?.();
        break;
    }
  }
}
