export interface CaseDetail {
  caseNumber: string;
  complainantName: string;
  defendantName: string;
  aadhaarNumber: string;
  panNumber: string;
  accountNumber: string;
  bankName: string;
  orderType: string;
  freezeAmount?: number;
  status: string;
  createdDate: string;
  attachments: { fileName: string; filePath: string; uploadedDate: string }[];
  bankResponse?: any;
}
