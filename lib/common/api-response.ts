export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export class APIResponseFactory {
  static ok<T>(data: T): APIResponse<T> {
    return { success: true, data };
  }

  static fail<T = never>(
    error: string,
    statusCode?: number
  ): APIResponse<T> {
    return { success: false, error, statusCode };
  }
}
