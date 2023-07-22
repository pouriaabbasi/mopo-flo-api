export interface ResponseDto<T> {
  message?: string;
  code?: number;
  isSuccess: boolean;
  data: T;
}
