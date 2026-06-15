import { CaseStatus, OrderType, ResponseType } from './enums';

export interface CaseListDto {
  id: string;
  caseNumber: string;
  status: CaseStatus;
  orderType: OrderType;
  defendantName: string;
}

export interface AttachmentDto {
  id: string;
  fileName: string;
  filePath: string;
}

export interface CaseResponseDto {
  id: string;
  responseType: ResponseType;
  freezeAmount: number | null;
  balanceAmount: number | null;
  remarks: string;
  respondedBy: string;
  respondedAt: string;
}

export interface CaseDetailDto {
  id: string;
  caseNumber: string;
  status: CaseStatus;
  orderType: OrderType;
  defendantName: string;
  defendantAadhaar: string;
  defendantPAN: string;
  defendantAccountNumber: string;
  defendantBankName: string;
  matchedAccountNumber: string;
  matchedBalance: number | null;
  matchedAccountStatus: string;
  attachments: AttachmentDto[];
  existingResponse: CaseResponseDto | null;
}

export interface DashboardSummaryDto {
  awaitingAction: number;
  pendingBatch: number;
  completed: number;
  autoResolved: number;
}

export interface SubmitFreezeResponseCommand {
  caseId: string;
  freezeAmount: number;
  remarks: string;
}

export interface SubmitBalanceResponseCommand {
  caseId: string;
  balanceAmount: number;
  remarks: string;
}

export interface BatchLogDto {
  id: string;
  runTime: string;
  durationInSeconds: number;
  processedCount: number;
  validatedCount: number;
  notFoundCount: number;
  status: string;
}
