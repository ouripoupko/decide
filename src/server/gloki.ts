import { IMethod, IProfile } from "src/types/interfaces";
import { deployContract, getAgentContracts, readAgentContract, writeAgentContract } from "./agent";

const PROFILE_CONTRACT_NAME = "unique-gloki-decide-profile";
const PROFILE_CONTRACT_FILE = "decide_profile.py";

async function deployProfileContract(server: string, agent: string) {
  return deployContract(
    server,
    agent,
    PROFILE_CONTRACT_NAME,
    PROFILE_CONTRACT_FILE,
    null,
    null
  );
}

export async function readAgentFromServer(server: string, agent: string) {
  const contracts = await getAgentContracts(server, agent);
  const profileContract = contracts.find(
    (contract) => contract.name === PROFILE_CONTRACT_NAME
  );
  return profileContract?.id || (await deployProfileContract(server, agent));
}

export async function readProfileFromServer(
  server: string,
  agent: string,
  contract: string
) {
  let method = {
    name: "get_profile",
    values: {},
  } as IMethod;
  return readAgentContract(server, agent, contract, method);
}

export async function writeProfileToServer(
    server: string,
    agent: string,
    contract: string,
    profile: IProfile
  ) {
    let method = { name: "set_values", values: { items: profile } } as IMethod;
    return await writeAgentContract(server, agent, contract, method);
  }
  