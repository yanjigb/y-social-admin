import { IBase } from "./base"

export interface IUser extends IBase {
  firstName: string
  lastName: string
  username: string
  profilePicture: string
  email: string
  followers: string[]
  followings: string[]
  isVerify: boolean
  isVerifyEmail: boolean
  bio: string
  phoneNumber: string
  insta: string
  linkedin: string
  github: string
  pinterest: string
  youtube: string
  twitter: string
  twitch: string
  facebook: string
}