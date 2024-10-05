import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isEqual from "react-fast-compare";
import { GetById } from "../../../../services/post.service";
import { GetById as GetUserInfo } from "../../../../services/user.service";
import { IUser } from "../../../../types/user";
import { IPost } from "../../../../types/post";
import AppMedia from "../../../../components/features/app-media";
import AppAvatar from "../../../../components/features/app-avatar";
import SocialMedia from "../../../../constants/social-media";
import CommentList from "../../../../components/business/dashboards/posts/comment-list";
import AppParagraphWithLink from "../../../../components/features/app-paragraph-with-link";
import { URL_REGEX } from "../../../../constants/regex";

const socialMediaMap = [
  {
    key: SocialMedia.FACEBOOK.title,
    iconClass: "ri-facebook-line",
    buttonClass: "ti-btn-primary",
    socialBaseLink: SocialMedia.FACEBOOK.link,
  },
  {
    key: SocialMedia.TWITTER.title,
    iconClass: "ri-twitter-line",
    buttonClass: "ti-btn-secondary",
    socialBaseLink: SocialMedia.TWITTER.link,
  },
  {
    key: SocialMedia.INSTAGRAM.title,
    iconClass: "ri-instagram-line",
    buttonClass: "ti-btn-warning",
    socialBaseLink: SocialMedia.INSTAGRAM.link,
  },
  {
    key: SocialMedia.GITHUB.title,
    iconClass: "ri-github-line",
    buttonClass: "ti-btn-success",
    socialBaseLink: SocialMedia.GITHUB.link,
  },
  {
    key: SocialMedia.YOUTUBE.title,
    iconClass: "ri-youtube-line",
    buttonClass: "ti-btn-danger",
    socialBaseLink: SocialMedia.YOUTUBE.link,
  },
  {
    key: SocialMedia.TWITCH.title,
    iconClass: "ri-twitch-line",
    buttonClass: "ti-btn-primary",
    socialBaseLink: SocialMedia.TWITCH.link,
  },
  {
    key: SocialMedia.PINTEREST.title,
    iconClass: "ri-pinterest-line",
    buttonClass: "ti-btn-danger",
    socialBaseLink: SocialMedia.PINTEREST.link,
  },
  {
    key: SocialMedia.LINKEDIN.title,
    iconClass: "ri-linkedin-line",
    buttonClass: "ti-btn-secondary",
    socialBaseLink: SocialMedia.LINKEDIN.link,
  },
];

const UserSocialMediaButtons: FC<{ user: IUser }> = ({ user }) => {
  const hasSocialMediaLinks = socialMediaMap.some(
    ({ key }) => user[key as keyof IUser]
  );

  return (
    <>
      {hasSocialMediaLinks ? (
        socialMediaMap.map(
          ({ key, iconClass, buttonClass, socialBaseLink }) => {
            const url = user[key as keyof IUser];
            if (!url) return null;

            return (
              <a
                key={key}
                href={`${socialBaseLink + url}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`${socialBaseLink + url}`}
              >
                <button
                  aria-label={key}
                  type="button"
                  className={`ti-btn w-[1.75rem] h-[1.75rem] text-[0.8rem] py-[0.26rem] px-2 rounded-sm ${buttonClass} mb-0`}
                >
                  <i className={`${iconClass} font-semibold`}></i>
                </button>
              </a>
            );
          }
        )
      ) : (
        <p className="text-gray-500">Don't have social network links</p>
      )}
    </>
  );
};

const PostDetail = () => {
  const params = useParams();
  const POST_ID = params.id;
  const [isValid, setIsValid] = useState(false);
  const [post, setPost] = useState<IPost | any>({});
  const [author, setAuthor] = useState<IUser | any>({});

  const fetchUser = (userId: string) => {
    GetUserInfo(userId)
      .then((response: any) => {
        if (response && response.user) {
          setAuthor(response.user);
        } else {
          setAuthor(null);
        }
      })
      .catch(() => setAuthor(null));
  };

  useEffect(() => {
    if (POST_ID) {
      GetById(POST_ID)
        .then((response) => {
          if (response && response.data) {
            setIsValid(true);
            setPost(response.data);
            fetchUser(response.data.userID);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => setIsValid(false));
    }
  }, [POST_ID]);

  return !isValid ? (
    <div className="flex items-center justify-center h-[80vh] text-xl">
      Post not found :({" "}
    </div>
  ) : (
    <div className="container my-[3rem]">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-8 col-span-12">
          <div className="box">
            <div className="box-body">
              <div className="sm:flex items-center">
                <div className="flex items-center flex-grow">
                  <span className="avatar avatar-sm me-4">
                    <AppAvatar
                      imageSrc={author?.profilePicture}
                      userId={author._id}
                      label={author.username}
                      customClass="bg-info"
                    />
                  </span>
                  <div>
                    <p className="mb-0 font-semibold">
                      {author.username} -{" "}
                      <span className="text-[0.6875rem] text-[#8c9097] dark:text-white/50 font-normal">
                        {post.createdAt}
                      </span>
                    </p>
                    <p className="mb-0 text-[#8c9097] dark:text-white/50"></p>
                  </div>
                </div>

                <div className="badge bg-warning/10 text-warning me-2 flex gap-1 sm:mt-0 mt-2">
                  <i className="ri-medal-line"></i> Top
                </div>
              </div>
            </div>

            <div className="px-5 max-h-[31.25rem]">
              {post.desc.match(URL_REGEX) && (
                <AppParagraphWithLink text={post.desc} isWithText={false} />
              )}
              {post.img && (
                <AppMedia
                  imageSrc={post.img}
                  label={`${author.username} post`}
                />
              )}
              {post.video && <AppMedia videoSrc={post.video} isVideo={true} />}
            </div>

            <div className="box-body border-b dark:border-defaultborder/10 border-dashed">
              <div className="sm:flex block items-center justify-between">
                <div className="flex items-center">
                  <span className="badge bg-success/10 text-success me-4">
                    <i className="ri-thumb-up-line me-1 align-middle inline-block"></i>{" "}
                    {post.likes.length} Likes
                  </span>
                  <span className="badge bg-info/10 text-info me-4">
                    <i className="ri-chat-4-line me-1 align-middle inline-block"></i>{" "}
                    {post.comments.length} Comments
                  </span>
                </div>
              </div>
            </div>
            <div className="box-body">
              <h5 className="font-bold mb-2">Post content</h5>
              <blockquote className="blockquote mb-0">
                {post.desc || "This post don't have content"}
              </blockquote>
            </div>
          </div>

          <div className="box">
            <div className="box-header">
              <div className="box-title">All comments</div>
            </div>
            <div className="box-body">
              <CommentList user={author} postID={post._id} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 col-span-12">
          <div className="box">
            <div className="box-body text-center !p-6">
              <span className="avatar avatar-rounded avatar-xxl !mb-4">
                <AppAvatar
                  imageSrc={author?.profilePicture}
                  userId={author._id}
                  label={author.username}
                  customClass="bg-info"
                />
              </span>
              <p className="mb-1 text-[0.9375rem] font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70 leading-none">
                {author.username}
              </p>
              <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">
                {author.email}
              </p>
              <p className="text-[#8c9097] dark:text-white/50 mb-0 p-4 pb-0">
                {author.bio || "Don't have bio :("}
              </p>
            </div>
            <div className="box-footer border-t blockt border-dashed text-center">
              <div>
                <div className="btn-list space-x-3 rtl:space-x-reverse">
                  <UserSocialMediaButtons user={author} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostDetail, isEqual);
