export interface IPurchaseOrderHead
{
  OrderId: number;
  OrderNo: string;
  OrderDate: string;
  PartyCode: number;
  PartyName: string;
  Remarks: string;
  CompanyId: number;
  dtls: IPurchaseOrderDtl[];
  verb: string;
}

export interface IPurchaseOrderDtl
{
  IdNo: number;
  ItemId: number;
  ItemName: string;
  UnitName: string;
  Qty: number;
  Rate: number;
  Amount: number;
}
