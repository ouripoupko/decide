import { IInvite, IIssue, IMethod } from "src/types/interfaces";
import { deployContract, joinContract, readAgentContract, writeAgentContract } from "./agent";
import issuesContract from "src/assets/contracts/issues_contract.py?raw";
import { deployIssueToServer } from "./issueApi";

export async function deployIssuesToServer(
  server: string,
  agent: string,
  name: string
) {
  const contract = await deployContract(
    server,
    agent,
    name,
    "issues_contract.py",
    issuesContract,
    null,
    {}
  );
  return contract;
}

export async function joinIssuesContract(
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
  return await readAgentContract(server, agent, contract, method) as IIssue[];
}

export async function addIssueToServer(
  server: string,
  agent: string,
  contract: string,
  issue: string
) {
  const issueContract = await deployIssueToServer(server, agent, issue);
  const writeMethod = {
    name: "add_issue",
    values: { issue: {contract: issueContract, name: issue} as IIssue},
  } as IMethod;
  writeAgentContract(server, agent, contract, writeMethod);
}
