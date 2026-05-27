export type Suppliers = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:            string;
    companyName?:   string;
    phoneNumber?:   string;
    contactName?:   string | null;
    supplierEmail?: string | null;
    status?:        string;
    address?:       string;
    licenseNumber?: string;
    createdAt?:     string;
    updatedAt?:     string;
}

export type Meta = {
    total?:       number;
    lastPage?:    number;
    currentPage?: number;
    perPage?:     number;
    prev?:        number | null;
    next?:        number | null;
}
