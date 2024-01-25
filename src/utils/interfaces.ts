// TODO: Go through and double check the interface names for consistency
export interface BlankObject {
    [key: string]: never;
}
export interface FilterObjectType {
    [key: string]: string | number | boolean
}