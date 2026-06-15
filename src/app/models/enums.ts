export enum CaseStatus {
  Pending = 0,
  AccountValidated = 1,
  AccountNotFound = 2,
  FreezeApplied = 3,
  BalanceProvided = 4,
  AmountRemitted = 5,
  CaseClosed = 6
}

export enum OrderType {
  FreezeAccount = 0,
  LienAmount = 1,
  RemitAmount = 2
}

export enum ResponseType {
  Freeze = 0,
  BalanceEnquiry = 1,
  Remittance = 2
}
