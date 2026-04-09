export type MedicineOrders = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:         string;
    orderCode?:  string;
    orderDate?:  Date;
    totalPrice?: number;
    status?:     string;
    createdAt?:  Date;
    updatedAt?:  Date;
    supplier?:   Supplier;
    user?:       User;
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

export type User = {
    name?:          string;
    empId?:         string;
    email?:         string;
    password?:      string;
    phoneNumber?:   null;
    role?:          string;
    shift?:         string;
    status?:        string;
    dateOfBirth?:   null;
    alamat?:        null;
    profileAvatar?: null;
    salary?:        number;
    startDate?:     Date;
    createdAt?:     Date;
    updatedAt?:     Date;
}

export type Meta = {
    total?:       number;
    lastPage?:    number;
    currentPage?: number;
    perPage?:     number;
    prev?:        null;
    next?:        null;
}
