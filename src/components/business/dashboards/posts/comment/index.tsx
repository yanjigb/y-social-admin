import { FC, memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { GetById as GetUserInfo } from "../../../../../services/user.service"
import { GetById } from "../../../../../services/comment.service"
import { IUser } from "../../../../../types/user"
import AppAvatar from "../../../../features/app-avatar"

interface CommentProps {
  commentID: string
  userID: string
}

const Comment: FC<CommentProps> = ({ commentID }) => {
  const [user, setUser] = useState<IUser | any>({})
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = (userID: string) => {
    GetUserInfo(userID).then((response: any) => {
      const { user } = response
      setUser(user);
    })
  }

  const fetchComment = (commentID: string) => {
    GetById(commentID).then((response: any) => {
      const { content, userID } = response.data
      setIsLoading(true)
      setContent(content)
      fetchUser(userID)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchComment(commentID)
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  ) : user.username && <div className="flex items-start px-2 py-4 shadow">
    <span className="avatar avatar-sm me-4 flex-shrink-0">
      <AppAvatar imageSrc={user.profilePicture} userId={user._id} label={user.username} customClass='bg-info' />
    </span>

    <div>
      <span className="font-bold">@{user.username}</span>

      <p
        className="fs-3 font-light max-w-full whitespace-pre-wrap"
      >
        {content}
      </p>
    </div>
  </div>
}

export default memo(Comment, isEqual)
