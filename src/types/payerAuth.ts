export type LoginPayerParamsType = {
    phoneNumber: string;
}

export type ConfirmPayerParamsType = {
    payerSessionId: number | null;
    confirmCode: number;
}

export type LogoutPayerParamsType = {
    payerToken: string
}