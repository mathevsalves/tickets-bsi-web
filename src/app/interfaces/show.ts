export interface Show {
  id: number | null,
  photo: any,
  name: string,
  address: string,
  dateShow: Date,
  price: number,
  description: string,
  edit?: boolean,
  quantityBuy: number;
}
