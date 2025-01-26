import currencyContract from "src/assets/contracts/currency_contract.py?raw"
import { deployContract } from "./agent";

export async function deployCurrencyToServer(
  server: string,
  agent: string,
  name: string,
) {
  return deployContract(
    server,
    agent,
    name,
    "currency_contract.py",
    currencyContract,
    null,
    {}
  );
}

export async function transfer(to: string, amount: number) {
  console.log(to, amount);

}

export async function setParameters(mint: number, burn: number) {

  console.log(mint, burn);

}