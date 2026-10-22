export interface IAttributeHead
{
  IdNo: number;
  Name: string;
  CompanyId: number;
  ListAttributeDtlResponse: IAttributeDtl[];
  Verb: string;
}

export interface IAttributeDtl
{
  IdNo: number;
  AttrValue: string;
  CompanyId: number;
}
