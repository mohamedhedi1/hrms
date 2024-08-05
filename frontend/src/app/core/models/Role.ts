import { Privilege } from "./Privilege"

export interface Role{
    id :string
    name : string
    privileges : Privilege[]

}