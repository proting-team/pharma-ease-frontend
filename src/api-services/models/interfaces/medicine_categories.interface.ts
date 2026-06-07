export type MedicineCategories = {
    status?:  number;
    message?: string;
    data?:    Datum[];
    meta?:    Meta;
}

export type Datum = {
    id?:           string;
    categoryName?: string;
    description?:  string | null;
    createdAt?:    Date;
    updatedAt?:    Date;
}

export type Meta = {
    total?:       number;
    lastPage?:    number;
    currentPage?: number;
    perPage?:     number;
    prev?:        null;
    next?:        null;
}
