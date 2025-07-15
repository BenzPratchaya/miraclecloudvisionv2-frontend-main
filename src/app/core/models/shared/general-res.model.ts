export class GeneralResModel<T> {
    Result?: T;
    Message?: string;
    IsSucceed?: boolean;
    IsFailed?: boolean;
    IsDuplicated?: boolean;
    HttpStatusCode?: number;
  }
  