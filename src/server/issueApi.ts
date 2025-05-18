import { IMethod, IProposal } from "src/types/interfaces";
import { deployContract, readAgentContract, writeAgentContract } from "./agent";
import issueContract from "src/assets/contracts/issue_contract.py?raw";

export async function deployIssueToServer(
  server: string,
  agent: string,
  name: string
) {
  const contract = await deployContract(
    server,
    agent,
    name,
    "issue_contract.py",
    issueContract,
    null,
    {}
  );
  return contract;
}

export async function readIssueFromServer(
  server: string,
  agent: string,
  contract: string
) {
  const method = {
    name: "get_issue",
    values: {},
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

export async function writeProposalToServer(
  server: string,
  agent: string,
  contract: string,
  proposal: IProposal,
) {
  const method = {
    name: "add_proposal",
    values: { proposal: proposal },
  } as IMethod;
  return await writeAgentContract(server, agent, contract, method);
}
