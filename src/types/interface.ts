import { IBase } from "./base"

export interface IComment extends IBase {
  userID: string
  content: string
}
