import type { ActivityLogs } from './interfaces/activity_logs.interface.ts'
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
  public static toActivityLogs(json: string): ActivityLogs {
    return cast(JSON.parse(json), r('ActivityLogs'))
  }

  public static activityLogsToJson(value: ActivityLogs): string {
    return JSON.stringify(uncast(value, r('ActivityLogs')), null, 2)
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
  ActivityLogs: o(
    [
      { json: 'status', js: 'status', typ: 0 },
      { json: 'message', js: 'message', typ: '' },
      { json: 'data', js: 'data', typ: a(r('Datum')) },
      { json: 'meta', js: 'meta', typ: r('Meta') },
    ],
    false,
  ),
  Datum: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'action', js: 'action', typ: '' },
      { json: 'employeeId', js: 'employeeId', typ: '' },
      { json: 'resourceType', js: 'resourceType', typ: '' },
      { json: 'resourceId', js: 'resourceId', typ: '' },
      { json: 'payloadData', js: 'payloadData', typ: r('PayloadData') },
      { json: 'createdAt', js: 'createdAt', typ: Date },
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
  Meta: o(
    [
      { json: 'total', js: 'total', typ: 0 },
      { json: 'lastPage', js: 'lastPage', typ: 0 },
      { json: 'currentPage', js: 'currentPage', typ: 0 },
      { json: 'perPage', js: 'perPage', typ: 0 },
      { json: 'prev', js: 'prev', typ: null },
      { json: 'next', js: 'next', typ: null },
    ],
    false,
  ),
}
