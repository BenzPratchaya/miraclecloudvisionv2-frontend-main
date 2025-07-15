export class CommonResponse {
  /**
   *
   */
  constructor() {
    this.IsSucceed = false;
    this.IsDuplicated = false;
    this.Result;
    this.Message ="";
    this.HttpStatusCode = 0;
  }
    IsSucceed?: boolean;
    IsDuplicated?: boolean;
    Result: any;
    Message?: string;
    HttpStatusCode?: number;
  }
  