export type Suppliers = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:                  string;
    supplierName?:        string;
    phoneNumber?:         string;
    contactPerson?:      string | null;
    contactPersonNumber?: string | null;
    status?:              string;
    address?:             string;
    createdAt?:           Date;
    updatedAt?:           Date;
}

export type Meta = {
    total?:       number;
    lastPage?:    number;
    currentPage?: number;
    perPage?:     number;
    prev?:        null;
    next?:        null;
}
