export interface ICategoryRequest {
  name:string,
  path:string
}

export interface ICategoryResponse extends ICategoryRequest{
  id:string
}
