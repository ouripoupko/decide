import { IContact, IMethod, IProfile } from "src/types/interfaces";
import {
  deployContract,
  getAgentContracts,
  isExistAgent,
  readAgentContract,
  registerAgent,
  writeAgentContract,
} from "./agent";
import profileContract from "src/assets/contracts/gloki_contract.py?raw";

const PROFILE_CONTRACT_NAME = "unique-gloki-decide-contract";

async function deployProfileContract(server: string, agent: string) {
  return deployContract(
    server,
    agent,
    PROFILE_CONTRACT_NAME,
    "gloki_contract.py",
    profileContract,
    null,
    {}
  );
}

export async function readAgentFromServer(server: string, agent: string) {
  const isExist = await isExistAgent(server, agent);
  if (!isExist) {
    await registerAgent(server, agent);
  }
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

export async function addContactToServer(
  server: string,
  agent: string,
  contract: string,
  contact: IContact
) {
  const contacts = [contact];
  // read more contacts from contact
  if (contact.contract) {
    const readMethod = {
      name: "get_contacts",
      values: {},
    } as IMethod;
    contacts.push(
      ...(await readAgentContract(
        contact.server,
        contact.agent,
        contact.contract,
        readMethod
      ))
    );
  }

  // write contacts to server
  const writeMethod = {
    name: "add_contacts",
    values: { contacts },
  } as IMethod;
  console.log('will send to server')
  writeAgentContract(server, agent, contract, writeMethod);
}

export async function getContactsFromServer(server: string, agent: string, contract: string) {
  const method = {
    name: "get_contacts",
    values: {  },
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}