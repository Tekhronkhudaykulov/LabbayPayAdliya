export type CheckType = {
    id?: number;
    account?: string | null;
    card_id?: string | null;
    card_number?: string | null;
    cheque_details?: string | null;
    childTransactions?: [] | null;
    amount?: number | null;
    commission_amount?: string | null;
    commission_type?: number | null;
    created_at?: {
        dateTime?: string;
    };
    currency?: string | null;
    merchant_id?: string | null;
    parentTransaction?: [] | number | null;
    partner_transaction_id?: string | null;
    payer_phone?: string | null;
    payment?: {
        name?: string | null;
    };
    status?: {
        int?: number | null;
        string?: string | null;
    };
    terminal_id?: string | null;
    vendor?: {
        short_name?: string | null
    }
}