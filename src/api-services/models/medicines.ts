/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Medicines } from './interfaces/medicine.interface'
import type {
  ArrayType,
  LiteralType,
  ObjectType,
  Property,
  RefType,
  TypeMap,
  UnionType,
} from './interfaces/model-type'

export class Convert {
  public static toMedicines(json: string): Medicines {
    return cast(JSON.parse(json), r('Medicines'))
  }

  public static medicinesToJson(value: Medicines): string {
    return JSON.stringify(uncast(value, r('Medicines')), null, 2)
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
function u(...typs: unknown[]): UnionType {
  return { unionMembers: typs }
}
function a(typ: unknown): ArrayType {
  return { arrayItems: typ }
}
function o(props: Property[], additional: boolean): ObjectType {
  return { props, additional }
}

const typeMap: TypeMap = {
  Medicines: o(
    [
      { json: 'status', js: 'status', typ: u(undefined, 0) },
      { json: 'message', js: 'message', typ: u(undefined, '') },
      { json: 'data', js: 'data', typ: u(undefined, a(r('Datum'))) },
      { json: 'meta', js: 'meta', typ: u(undefined, r('Meta')) },
    ],
    false,
  ),
  Datum: o(
    [
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'medicineName', js: 'medicineName', typ: u(undefined, '') },
      { json: 'sku', js: 'sku', typ: u(undefined, '') },
      { json: 'description', js: 'description', typ: u(undefined, null) },
      { json: 'stock', js: 'stock', typ: u(undefined, 0) },
      { json: 'price', js: 'price', typ: u(undefined, 0) },
      { json: 'expiredDate', js: 'expiredDate', typ: u(undefined, Date) },
      { json: 'createdAt', js: 'createdAt', typ: u(undefined, Date) },
      { json: 'updatedAt', js: 'updatedAt', typ: u(undefined, Date) },
      { json: 'category', js: 'category', typ: u(undefined, r('Category')) },
      { json: 'supplier', js: 'supplier', typ: u(undefined, r('Supplier')) },
    ],
    false,
  ),
  Category: o(
    [
      { json: 'categoryName', js: 'categoryName', typ: u(undefined, '') },
      { json: 'description', js: 'description', typ: u(undefined, null) },
      { json: 'createdAt', js: 'createdAt', typ: u(undefined, Date) },
      { json: 'updatedAt', js: 'updatedAt', typ: u(undefined, Date) },
    ],
    false,
  ),
  Supplier: o(
    [
      { json: 'supplierName', js: 'supplierName', typ: u(undefined, '') },
      { json: 'phoneNumber', js: 'phoneNumber', typ: u(undefined, '') },
      { json: 'contactPerson', js: 'contactPerson', typ: u(undefined, null) },
      { json: 'contactPersonNumber', js: 'contactPersonNumber', typ: u(undefined, null) },
      { json: 'status', js: 'status', typ: u(undefined, '') },
      { json: 'address', js: 'address', typ: u(undefined, '') },
      { json: 'createdAt', js: 'createdAt', typ: u(undefined, Date) },
      { json: 'updatedAt', js: 'updatedAt', typ: u(undefined, Date) },
    ],
    false,
  ),
  Meta: o(
    [
      { json: 'total', js: 'total', typ: u(undefined, 0) },
      { json: 'lastPage', js: 'lastPage', typ: u(undefined, 0) },
      { json: 'currentPage', js: 'currentPage', typ: u(undefined, 0) },
      { json: 'perPage', js: 'perPage', typ: u(undefined, 0) },
      { json: 'prev', js: 'prev', typ: u(undefined, null) },
      { json: 'next', js: 'next', typ: u(undefined, null) },
    ],
    false,
  ),
}
