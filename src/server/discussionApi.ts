import { IInvite, IMethod } from "src/types/interfaces";
import { deployContract, joinContract, readAgentContract, writeAgentContract } from "./agent";
import discussionContract from "src/assets/contracts/discussion_contract.py?raw";

export async function deployDiscussionToServer(
  server: string,
  agent: string,
  name: string
) {
  const contract = await deployContract(
    server,
    agent,
    name,
    "discussion_contract.py",
    discussionContract,
    null,
    {}
  );
  return contract;
}

export async function joinDiscussionContract(
  server: string,
  agent: string,
  invite: IInvite
) {
  if (invite.contract) {
    joinContract(server, agent, invite);
  }
}

export async function getIssuesFromServer(
  server: string,
  agent: string,
  contract: string
) {
  const method = {
    name: "get_issues",
    values: {},
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

export async function addIssueToServer(
  server: string,
  agent: string,
  contract: string,
  issue: string
) {
  const writeMethod = {
    name: "add_issue",
    values: { text: issue },
  } as IMethod;
  writeAgentContract(server, agent, contract, writeMethod);
}
