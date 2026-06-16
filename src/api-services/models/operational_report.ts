import type { OperationalReport } from './interfaces/operational_report.interface.ts'
import type {
  LiteralType,
  ObjectType,
  Property,
  RefType,
  TypeMap,
  UnionType,
  ArrayType,
} from './interfaces/model-type'

export class Convert {
  public static toOperationalReport(json: string): OperationalReport {
    return cast(JSON.parse(json), r('OperationalReport'))
  }

  public static operationalReportToJson(value: OperationalReport): string {
    return JSON.stringify(uncast(value, r('OperationalReport')), null, 2)
  }
}

function invalidValue(typ: unknown, val: unknown, key: string, parent: string = ''): never {
  const prettyTyp = prettyTypeName(typ)
  const parentText = parent ? ` on ${parent}` : ''
  const keyText = key ? ` for key "${key}"` : ''
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  )
}

function prettyTypeName(typ: unknown): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`
    }
    return `one of [${typ.map((a) => prettyTypeName(a)).join(', ')}]`
  } else if (typeof typ === 'object' && typ !== null && 'literal' in typ) {
    return (typ as LiteralType).literal
  }
  return typeof typ
}

function jsonToJSProps(typ: ObjectType): Record<string, { key: string; typ: unknown }> {
  if (typ.jsonToJS === undefined) {
    const map: Record<string, { key: string; typ: unknown }> = {}
    typ.props.forEach((p) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: ObjectType): Record<string, { key: string; typ: unknown }> {
  if (typ.jsToJSON === undefined) {
    const map: Record<string, { key: string; typ: unknown }> = {}
    typ.props.forEach((p) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(
  val: unknown,
  typ: unknown,
  getProps: (t: ObjectType) => any,
  key: string = '',
  parent: string = '',
): any {
  function transformPrimitive(typ: string, val: unknown): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val, key, parent)
  }

  function transformUnion(typs: unknown[], val: unknown): any {
    for (const t of typs) {
      try {
        return transform(val, t, getProps)
      } catch (error) {
        console.log(error)
      }
    }
    return invalidValue(typs, val, key, parent)
  }

  function transformArray(typ: unknown, val: unknown): any {
    if (!Array.isArray(val)) return invalidValue('array', val, key, parent)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformObject(props: Record<string, any>, additional: unknown, val: unknown): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val, key, parent)
    }
    const result: Record<string, any> = {}
    const input = val as Record<string, unknown>

    Object.getOwnPropertyNames(props).forEach((k) => {
      const prop = props[k]
      const v = Object.prototype.hasOwnProperty.call(input, k) ? input[k] : undefined
      result[prop.key] = transform(v, prop.typ, getProps, k, parent)
    })
    return result
  }

  function transformDate(val: unknown): any {
    if (val === null) return null
    const d = new Date(val as any)
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val, key, parent)
    }
    return d
  }

  if (typ === 'any') return val
  if (typ === null) return val === null ? val : invalidValue(typ, val, key, parent)

  let currentTyp = typ
  let ref: string | undefined = undefined

  while (typeof currentTyp === 'object' && currentTyp !== null && 'ref' in currentTyp) {
    ref = (currentTyp as RefType).ref
    currentTyp = typeMap[ref]
  }

  if (Array.isArray(currentTyp)) return transformPrimitive(typeof val, val)

  if (typeof currentTyp === 'object' && currentTyp !== null) {
    if ('unionMembers' in currentTyp)
      return transformUnion((currentTyp as UnionType).unionMembers, val)
    if ('arrayItems' in currentTyp) return transformArray((currentTyp as ArrayType).arrayItems, val)
    if ('props' in currentTyp)
      return transformObject(
        getProps(currentTyp as ObjectType),
        (currentTyp as ObjectType).additional,
        val,
      )
  }

  if (currentTyp === Date && typeof val !== 'number') return transformDate(val)

  return transformPrimitive(currentTyp as string, val)
}

function cast<T>(val: unknown, typ: unknown): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: unknown): unknown {
  return transform(val, typ, jsToJSONProps)
}

function r(name: string): RefType {
  return { ref: name }
}
function a(typ: unknown): ArrayType {
  return { arrayItems: typ }
}
function o(props: Property[], additional: boolean): ObjectType {
  return { props, additional }
}
const typeMap: TypeMap = {
  OperationalReport: o(
    [
      { json: 'status', js: 'status', typ: 0 },
      { json: 'message', js: 'message', typ: '' },
      { json: 'data', js: 'data', typ: r('Data') },
      { json: 'meta', js: 'meta', typ: null },
    ],
    false,
  ),
  Data: o(
    [
      { json: 'metadata', js: 'metadata', typ: r('Metadata') },
      { json: 'stats', js: 'stats', typ: r('Stats') },
      { json: 'medicines', js: 'medicines', typ: a(r('Medicine')) },
      { json: 'activityLogs', js: 'activityLogs', typ: a(r('ActivityLog')) },
    ],
    false,
  ),
  ActivityLog: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'action', js: 'action', typ: '' },
      { json: 'employeeId', js: 'employeeId', typ: '' },
      { json: 'resourceType', js: 'resourceType', typ: '' },
      { json: 'resourceId', js: 'resourceId', typ: '' },
      { json: 'payloadData', js: 'payloadData', typ: r('PayloadData') },
      { json: 'createdAt', js: 'createdAt', typ: Date },
      { json: 'employee', js: 'employee', typ: r('Employee') },
    ],
    false,
  ),
  Employee: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'empId', js: 'empId', typ: '' },
      { json: 'role', js: 'role', typ: '' },
    ],
    false,
  ),
  PayloadData: o(
    [
      { json: 'email', js: 'email', typ: '' },
      { json: 'password', js: 'password', typ: '' },
    ],
    false,
  ),
  Medicine: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'medicineName', js: 'medicineName', typ: '' },
      { json: 'sku', js: 'sku', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'categoryId', js: 'categoryId', typ: '' },
      { json: 'supplierId', js: 'supplierId', typ: '' },
      { json: 'stock', js: 'stock', typ: 0 },
      { json: 'price', js: 'price', typ: 0 },
      { json: 'expiredDate', js: 'expiredDate', typ: Date },
      { json: 'createdAt', js: 'createdAt', typ: Date },
      { json: 'updatedAt', js: 'updatedAt', typ: Date },
      { json: 'category', js: 'category', typ: r('Category') },
      { json: 'supplier', js: 'supplier', typ: r('Supplier') },
    ],
    false,
  ),
  Category: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'categoryName', js: 'categoryName', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'createdAt', js: 'createdAt', typ: Date },
      { json: 'updatedAt', js: 'updatedAt', typ: Date },
    ],
    false,
  ),
  Supplier: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'companyName', js: 'companyName', typ: '' },
      { json: 'phoneNumber', js: 'phoneNumber', typ: '' },
      { json: 'contactName', js: 'contactName', typ: '' },
      { json: 'supplierEmail', js: 'supplierEmail', typ: '' },
      { json: 'status', js: 'status', typ: r('Status') },
      { json: 'address', js: 'address', typ: '' },
      { json: 'licenseNumber', js: 'licenseNumber', typ: '' },
      { json: 'createdAt', js: 'createdAt', typ: Date },
      { json: 'updatedAt', js: 'updatedAt', typ: Date },
    ],
    false,
  ),
  Metadata: o(
    [
      { json: 'generatedAt', js: 'generatedAt', typ: Date },
      { json: 'filter', js: 'filter', typ: r('Filter') },
    ],
    false,
  ),
  Filter: o(
    [
      { json: 'startDate', js: 'startDate', typ: null },
      { json: 'endDate', js: 'endDate', typ: null },
    ],
    false,
  ),
  Stats: o(
    [
      { json: 'totalMedicines', js: 'totalMedicines', typ: 0 },
      { json: 'lowStockMedicines', js: 'lowStockMedicines', typ: 0 },
      { json: 'outOfStockMedicines', js: 'outOfStockMedicines', typ: 0 },
      { json: 'expiredMedicines', js: 'expiredMedicines', typ: 0 },
      { json: 'totalActivityLogs', js: 'totalActivityLogs', typ: 0 },
    ],
    false,
  ),
  Status: ['ACTIVE', 'INACTIVE'],
}
