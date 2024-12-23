import { IContract, IMethod } from "src/types/interfaces";

export async function isExistAgent(
  server: string,
  agent: string
): Promise<boolean> {
  const reply = await fetch(
    `${server}/ibc/app/${agent}?action=is_exist_agent`,
    {
      method: "GET",
    }
  );
  return await reply.json();
}

export async function registerAgent(
  server: string,
  agent: string
): Promise<boolean> {
  const reply = await fetch(
    `${server}/ibc/app/${agent}?action=register_agent`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: server }),
    }
  );
  return await reply.json();
}

export function listenAgent(
  server: string,
  agent: string,
  listener: (data: string) => void
) {
  const eventSource = new EventSource(
    `${server}/stream?agent=${agent}&contract=`
  );

  eventSource.onmessage = (event) => {
    listener(event.data);
  };

  return () => {
    eventSource.close(); // Clean up on unmount
  };
}

export async function getAgentContracts(
  server: string,
  agent: string
): Promise<IContract[]> {
  const response = await fetch(`${server}/ibc/app/${agent}?action=get_contracts`, {
    method: "GET",
  });
  const reply =  await response.json();
  return reply;
}

export async function deployContract(
  server: string,
  agent: string,
  name: string,
  fileName: string,
  code: string,
  profile: string | null,
  ctor: any
) {
  const contract = {
    name,
    contract: fileName,
    code,
    protocol: "BFT",
    default_app: "",
    pid: agent,
    address: server,
    profile,
    constructor: ctor,
  } as IContract;

  const response = await fetch(`${server}/ibc/app/${agent}?action=deploy_contract`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contract),
  });
  return response.json();
}

export async function readAgentContract(
  server: string,
  agent: string,
  contract: string,
  method: IMethod
) {
  const response = await fetch(
    `${server}/ibc/app/${agent}/${contract}/${method.name}?action=contract_read`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(method),
    }
  );
  const reply = await response.json();
  return reply;
}

export async function writeAgentContract(
  server: string,
  agent: string,
  contract: string,
  method: IMethod
) {
  const response = await fetch(
    `${server}/ibc/app/${agent}/${contract}/${method.name}?action=contract_write`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(method),
    }
  );
  const reply = await response.json();
  return reply;
}
