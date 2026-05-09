export class GeneralHelper {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }

    if (typeof error === 'string') {
      return error
    }

    if (error && typeof error === 'object') {
      const maybeError = error as { message?: string; msg?: string }
      return maybeError.message || maybeError.msg || 'Unknown error object'
    }

    return 'An unknown error occurred'
  }

  static formatErrorResponse(error: unknown): string {
    const axiosLikeError = error as {
      response?: { data?: { message?: string }; statusText?: string }
    }

    return (
      axiosLikeError.response?.data?.message ||
      axiosLikeError.response?.statusText ||
      GeneralHelper.getErrorMessage(error)
    )
  }
}
