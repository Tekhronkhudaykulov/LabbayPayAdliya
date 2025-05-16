export type VendorsByCategoryParamsType = {
    categoryId: number | string;
}

export type CategoryType = {
    id?: number;
    name?: string;
    order?: number | string;
    logo?: {
        link?: string;
    };
    vendors?: VendorType[],
}

export type MainType = {
    categories?: CategoryType[];
    main?: [];
    version?: string;
    supportPhone?: string;
    telegramLink?: string
}

export type VendorType = {
    id?: number,
    short_name?: string,
    logo?: { link?: string },
    description?: string;
}

export type VendorFormParamsType = {
    vendorId: number;
    paymentType: number;
}

export type VendorFormType = {
    id?: number;
    prefix?: string;
    label?: string;
    key?: string;
    element?: string;
    type?: string;
    value?: string;
    options?: {
        text?: string;
        value?: string;
        id?: number | string;
    }[];
    show?: number;
    mask?: string;
    regex?: string;
    placeholder?: string;
    size?: string;
    min_amount?: number | string;
    max_amount?: number | string;
    order?: number;
    is_required?: number;
}

export type MainPageSearchType = {
    search?: string | null;
}