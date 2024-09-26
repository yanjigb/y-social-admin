import { FC, memo } from "react";
import isEqual from "react-fast-compare";
import { IUser } from "../../../../types/user";
import SocialMedia from "../../../../constants/social-media";

interface UserDetailProps {
  user: IUser;
}

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
        <div className="btn-list mb-0 gap-2 flex">
          {socialMediaMap.map(
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
          )}
        </div>
      ) : (
        <p className="text-gray-500">Don't have social network links</p>
      )}
    </>
  );
};

const AdvertiseDetail: FC<Readonly<UserDetailProps>> = ({ user }) => {
  return (
    <div
      className="hs-overlay hidden ti-offcanvas ti-offcanvas-right !max-w-[25rem] !border-0"
      tabIndex={-1}
      id="hs-overlay-contacts"
      aria-labelledby="offcanvasExample"
    >
      <div className="ti-offcanvas-body !p-0">
        <div className="sm:flex items-start p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 main-profile-cover">
          <div>
            <span className="avatar avatar-xxl avatar-rounded me-3 bg-light/10 p-2">
              <img
                src={user.profilePicture || "/images/default-avatar.svg"}
                alt={user.username}
                className="object-cover aspect-square"
              />
            </span>
          </div>
          <div className="flex-fill main-profile-info w-full">
            <div className="flex items-center justify-between">
              <h6 className="font-semibold mb-1 text-white">
                {user.firstName?.trim() || user.lastName?.trim()
                  ? `${user.firstName?.trim()} ${user.lastName?.trim()}`.trim()
                  : user.username}
              </h6>
              <button
                type="button"
                className="ti-btn flex-shrink-0 !p-0  transition-none text-white opacity-70 hover:opacity-100 hover:text-white focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:outline-0 focus-visible:outline-0 !mb-0"
                data-hs-overlay="#hs-overlay-contacts"
              >
                <span className="sr-only">Close modal</span>
                <i className="ri-close-line leading-none text-lg"></i>
              </button>
            </div>
            <p className="mb-1 text-white opacity-70">@{user.username}</p>
            <p className="text-[0.75rem] text-white mb-4 opacity-50">
              <span>
                <i className="ri-map-pin-line me-1 align-middle"></i>VIETNAM
              </span>
            </p>
            <div className="flex mb-0">
              <div className="me-4">
                <p className="font-bold text-xl text-white text-shadow mb-0">
                  {user.followers?.length || 0}
                </p>
                <p className="mb-0 text-[0.6875rem] opacity-50 text-white">
                  Followers
                </p>
              </div>
              <div className="me-4">
                <p className="font-bold text-xl text-white text-shadow mb-0">
                  {user.followings?.length || 0}
                </p>
                <p className="mb-0 text-[0.6875rem] opacity-50 text-white">
                  Followings
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
          <div className="mb-0">
            <p className="text-[0.9375rem] mb-2 font-semibold">User Bio :</p>
            <p className="text-[#8c9097] dark:text-white/50 op-8 mb-0">
              {user.bio || "Empty"}
            </p>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
          <p className="text-[.875rem] mb-2 me-4 font-semibold">
            Contact Information :
          </p>
          <div className="">
            <div className="flex items-center mb-2">
              <div className="me-2">
                <span className="avatar avatar-sm avatar-rounded bg-light !text-[#8c9097] dark:text-white/50">
                  <i className="ri-mail-line align-middle text-[.875rem]"></i>
                </span>
              </div>
              <div>{user.email}</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="me-2">
                <span className="avatar avatar-sm avatar-rounded bg-light !text-[#8c9097] dark:text-white/50">
                  <i className="ri-phone-line align-middle text-[.875rem]"></i>
                </span>
              </div>
              <div>{user.phoneNumber || "no info"}</div>
            </div>
            <div className="flex items-center mb-0">
              <div className="me-2">
                <span className="avatar avatar-sm avatar-rounded bg-light !text-[#8c9097] dark:text-white/50">
                  <i className="ri-map-pin-line align-middle text-[.875rem]"></i>
                </span>
              </div>
              <div>VIETNAM</div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 flex flex-col gap-2">
          <p className="text-[.875rem] mb-0 me-4 font-semibold">
            Social Networks :
          </p>
          <div className="btn-list mb-0 gap-1 flex">
            <UserSocialMediaButtons user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AdvertiseDetail, isEqual);
