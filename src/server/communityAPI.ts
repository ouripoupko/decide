import {
  deployContract,
  getAgentContracts,
  joinContract,
  readAgentContract,
  writeAgentContract,
} from "./agent";
import wotContract from "src/assets/contracts/wot_community_contract.py?raw";
import gossipContract from "src/assets/contracts/gossip_community_contract.py?raw";
import { deployCurrencyToServer } from "./currencyAPI";
import { IInvite, IMethod } from "src/types/interfaces";

export enum ECommunityType {
  WotCommunity,
  GossipCommunity,
}

export const communityContractType = {
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
  const currency = await deployCurrencyToServer(server, agent, name);
  const community = await deployContract(
    server,
    agent,
    name,
    communityContractType[type],
    code[type],
    null,
    {}
  );
    const writeMethod = {
      name: "set_sub_contract",
      values: { name: "currency", contract: currency },
    } as IMethod;
    writeAgentContract(server, agent, community, writeMethod);
  
  return community
}

export async function getCurrencyContractFromServer(server: string, agent: string, contract: string) {
    const method = {
      name: "get_sub_contract",
      values: {name: "currency"},
    } as IMethod;
    return await readAgentContract(server, agent, contract, method);
}

export async function readCommunitiesFromServer(server: string, agent: string) {
  const contracts = await getAgentContracts(server, agent);
  const profileContracts = contracts.filter(
    (contract) =>
      contract.contract === communityContractType[ECommunityType.WotCommunity] ||
      contract.contract === communityContractType[ECommunityType.GossipCommunity]
  );
  return profileContracts;
}

export async function joinCommunityContract(server: string, agent: string, invite: IInvite) {
  console.log('joining community');
  await joinContract(server, agent, invite);
}