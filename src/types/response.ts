export type ErrorResponseType = {
    response?: {
        data?: {
            data?: {
                message?: string
            }
            status?: number;
            authError?: boolean
        }
        status?: number
    }
}

export type RequestTimeoutErrorType = {
    error?: {
        code?: string
    }
}