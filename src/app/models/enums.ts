export enum CaseStatus {
  Pending = 1,
  AccountValidated = 2,
  AccountNotFound = 3,
  FreezeApplied = 4,
  BalanceProvided = 5
}

export enum OrderType {
  Freeze = 0,
  BalanceEnquiry = 1
}

export enum ResponseType {
  Freeze = 0,
  BalanceEnquiry = 1,
  Remittance = 2
}
