import currencyContract from "src/assets/contracts/currency_contract.py?raw";
import { deployContract, readAgentContract, writeAgentContract } from "./agent";
import { IMethod } from "src/types/interfaces";

export async function deployCurrencyToServer(
  server: string,
  agent: string,
  name: string
) {
  const contract = await deployContract(
    server,
    agent,
    name,
    "currency_contract.py",
    currencyContract,
    null,
    {}
  );
  return contract;
}

export async function transfer(to: string, amount: number) {
  console.log(to, amount);
}

export async function getBalanceFromServer(
  server: string,
  agent: string,
  contract: string
) {
  const method = {
    name: "get_balance",
    values: {},
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

export async function setParametersToServer(
  server: string,
  agent: string,
  contract: string,
  mint: number,
  burn: number
) {
  const method = {
    name: "transfer",
    values: { to: agent, value: 0 },
    parameters: { mint, burn },
  } as IMethod;
  return await writeAgentContract(server, agent, contract, method);
}

export async function getParametersFromServer(
  server: string,
  agent: string,
  contract: string
) {
  const method = {
    name: "get_parameters",
    values: {},
  } as IMethod;
  return await readAgentContract(server, agent, contract, method);
}

// export async function joinCurrencyContract(server: string, agent: string, invite: IInvite) {
// }