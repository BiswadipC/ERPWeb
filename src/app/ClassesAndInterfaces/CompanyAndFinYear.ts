export interface ICompany
{
  company_id: number;
  comp_code: string;
  comp_name: string;
  address1: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
  reg_no: string;
  gstin: string;
  date_of_incorporation: string;
  contact_person: string;

}

export interface IFinYear
{
  fin_year_id: number;
  from_date: string;
  to_date: string;
}
