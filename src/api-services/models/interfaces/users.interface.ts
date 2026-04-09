export type Users = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:            string;
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
    profileAvatar?: null | string;
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
