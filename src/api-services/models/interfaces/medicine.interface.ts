export type Medicines = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:           string;
    medicineName?: string;
    sku?:          string;
    description?:  null;
    stock?:        number;
    price?:        number;
    expiredDate?:  Date;
    createdAt?:    Date;
    updatedAt?:    Date;
    category?:     Category;
    supplier?:     Supplier;
}

export type Category = {
    categoryName?: string;
    description?:  null;
    createdAt?:    Date;
    updatedAt?:    Date;
}

export type Supplier = {
    supplierName?:        string;
    phoneNumber?:         string;
    contactPerson?:       null;
    contactPersonNumber?: null;
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
