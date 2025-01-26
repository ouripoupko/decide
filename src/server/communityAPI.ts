import {
  deployContract,
  getAgentContracts,
} from "./agent";
import wotContract from "src/assets/contracts/wot_community_contract.py?raw";
import gossipContract from "src/assets/contracts/gossip_community_contract.py?raw";
import { deployCurrencyToServer } from "./currencyAPI";

export enum ECommunityType {
  WotCommunity,
  GossipCommunity,
}

const fileName = {
  [ECommunityType.WotCommunity]: "wot_community_contract.py",
  [ECommunityType.GossipCommunity]: "gossip_community_contract.py",
};

const code = {
  [ECommunityType.WotCommunity]: wotContract,
  [ECommunityType.GossipCommunity]: gossipContract,
};

export async function deployCommunityToServer(
  server: string,
  agent: string,
  name: string,
  type: ECommunityType
) {
  await deployCurrencyToServer(server, agent, name);
  return deployContract(
    server,
    agent,
    name,
    fileName[type],
    code[type],
    null,
    {}
  );
}

export async function readCommunitiesFromServer(server: string, agent: string) {
  const contracts = await getAgentContracts(server, agent);
  const profileContracts = contracts.filter(
    (contract) =>
      contract.contract === fileName[ECommunityType.WotCommunity] ||
      contract.contract === fileName[ECommunityType.GossipCommunity]
  );
  return profileContracts;
}
