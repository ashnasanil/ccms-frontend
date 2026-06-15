export enum OrderType {
  FreezeAccount = 0,
  BalanceEnquiry = 1
}

export interface CreateCaseResponse {
  caseNumber: string;
  status: string;
}
