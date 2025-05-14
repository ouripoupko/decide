import { IMethod } from "src/types/interfaces";
import { deployContract, readAgentContract } from "./agent";
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
