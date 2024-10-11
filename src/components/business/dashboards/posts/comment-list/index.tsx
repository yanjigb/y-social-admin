import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import Comment from "../comment";
import { IUser } from "../../../../../types/user";
import { GetByPostId } from "../../../../../services/comment.service";
import { IComment } from "../../../../../types/interface";

interface CommentListProps {
  user: IUser;
  postID: string;
}

const CommentList: FC<CommentListProps> = ({ postID }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const response: any = await GetByPostId(postID);
      const { comments } = response;

      if (comments.length === 0) {
        setComments([]); // Set to an empty array
      } else {
        setComments(comments);
      }
    } catch (err) {
      setError("Failed to fetch comments");
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postID]); // Dependency on postID to refetch if it changes

  if (loading) {
    return <div>Loading...</div>; // Optional: Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Optional: Show error message
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {comments.length === 0 ? (
        <span>No comments available</span>
      ) : (
        comments.map(comment => (
          <Comment key={comment._id} commentID={comment._id} userID={comment.userID} />
        ))
      )}
    </div>
  );
};

export default memo(CommentList, isEqual);
