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
import { deployDiscussionToServer } from "./discussionApi";

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


async function setSubContract(server: string, agent: string, community: string, contract: string, name: string) {
  const writeMethod = {
    name: "set_sub_contract",
    values: { name, invite: { server, agent, contract } },
  } as IMethod;
  writeAgentContract(server, agent, community, writeMethod);
}

export async function deployCommunityToServer(
  server: string,
  agent: string,
  name: string,
  type: ECommunityType
) {
  const currency = await deployCurrencyToServer(server, agent, name);
  const discussion = await deployDiscussionToServer(server, agent, name);
  const community = await deployContract(
    server,
    agent,
    name,
    communityContractType[type],
    code[type],
    null,
    {}
  );

  setSubContract(server, agent, community, currency, "currency");
  setSubContract(server, agent, community, discussion, "discussion");

  return community;
}

export async function getCommunitySubContractFromServer(
  server: string,
  agent: string,
  contract: string,
  name: string
) {
  const method = {
    name: "get_sub_contract",
    values: { name },
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

export async function readCommunitiesFromServer(server: string, agent: string) {
  const contracts = await getAgentContracts(server, agent);
  const profileContracts = contracts.filter(
    (contract) =>
      contract.contract ===
        communityContractType[ECommunityType.WotCommunity] ||
      contract.contract ===
        communityContractType[ECommunityType.GossipCommunity]
  );
  return profileContracts;
}

export async function joinCommunityContract(
  server: string,
  agent: string,
  invite: IInvite
) {
  await joinContract(server, agent, invite);
}
