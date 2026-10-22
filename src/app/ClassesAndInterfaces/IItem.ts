export interface IItemHead
{
  ItemId: number;
  ItemName: string;
  UnitId: number;
  UnitName: string;
  MRP: number;
  ReorderLevel: number;
  CompanyId: number;
  ListItemDtl: IItemDtl[];
  ListItemOpStock: IItemOpStock[];
  itemGst: IItemGst;
  verb: string;
} // interface...

export interface IItemDtl
{
  DtlId: number;
  AttrHeadId: number;
  AttrHeadName: string;
  AttrDtlId: number;
  AttrDtlValue: string;
} // interface...

export interface IItemGst
{
  IdNo: number;
  PurCgst: number;
  PurSgst: number;
  PurIgst: number;
  SalCgst: number;
  SalSgst: number;
  SalIgst: number;
} // interface...

export interface IItemOpStock
{
  IdNo: number;
  WhId: number;
  WhName: string;
  Qty: number;
  Rate: number;
  Amount: number;
} // interface...
