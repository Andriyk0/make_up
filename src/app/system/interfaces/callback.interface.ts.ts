export interface ICallbackRequest {
  name:string,
  phone:string,
  description:string
}

export interface ICallbackResponse extends ICallbackRequest{
  id:string
}
