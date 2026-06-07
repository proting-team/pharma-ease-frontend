export type MedicineOrders = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type OrderDetail = {
    medicineId?: string;
    quantity?:   number;
    unitPrice?:  number;
    subtotal?:   number;
    medicine?:   {
        id?:           string;
        medicineName?: string;
    };
}

export type Datum = {
    id?:           string;
    orderCode?:    string;
    orderDate?:    Date;
    totalPrice?:   number;
    status?:       string;
    createdAt?:    Date;
    updatedAt?:    Date;
    supplier?:     Supplier;
    employee?:     Employee;
    orderDetails?: OrderDetail[];
}

export type Employee = {
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
    profileAvatar?: null;
    salary?:        number;
    startDate?:     Date;
    createdAt?:     Date;
    updatedAt?:     Date;
}

export type Supplier = {
    id?:                  string;
    companyName?:         string;
    phoneNumber?:         string;
    contactName?:         string | null;
    supplierEmail?:       string | null;
    status?:              string;
    address?:             string;
    licenseNumber?:       string;
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
