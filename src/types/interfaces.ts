export interface IContract {
  id: string;
  name: string;
  contract: string;
  code: string;
  protocol: string;
  default_app: string;
  pid: string;
  address: string;

  group: string[];
  threshold: number;
  profile: string;

  constructor: any;
}

export interface IMethod {
  name: string;
  arguments: string[];
  values: any;
}

export interface IContact {
  server: string;
  agent: string;
  contract: string;
}

export interface IInvite {
  server: string;
  agent: string;
  contract: string | undefined;
  name: string | undefined;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  userPhoto: string;
  userBio: string;
}
