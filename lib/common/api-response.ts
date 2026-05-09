import type { APIResponse } from '@/dto/api.page.dto';

export type { APIResponse };

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
