import { IBase } from "./base"

export interface IPost extends IBase {
  userID: string
  desc: string
  img: string
  video: string
  likes: string[]
  comments: [
    {
      userID: string,
      content: string
    }
  ]
  shares: string[]
  isEdited: boolean
}