export interface IPresentRequest{
  name:string,
  path:string,
  description:string,
  sex:string,
  country:string,
  use:string,
  price:number,
  imagePath:string,
  count:number
}

export interface IPresentResponse extends IPresentRequest{
  id:string;
}
