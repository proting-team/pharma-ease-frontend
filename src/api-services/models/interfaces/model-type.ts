export type TypeMap = { [key: string]: ObjectType }

export type ObjectType = {
  props: Property[]
  additional: boolean | unknown
  jsonToJS?: { [key: string]: { key: string; typ: unknown } }
  jsToJSON?: { [key: string]: { key: string; typ: unknown } }
}

export type Property = {
  json: string
  js: string
  typ: unknown
}

export type UnionType = { unionMembers: unknown[] }
export type ArrayType = { arrayItems: unknown }
export type LiteralType = { literal: string }
export type RefType = { ref: string }
