import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { Global } from "../../../types/global";
import { GetById } from "../../../services/user.service";

interface AvatarProps {
  imageSrc: string
  label: string
  customClass?: string
  customAttrs?: object
  fontSize?: string
  userId: string
}

const Avatar: FC<AvatarProps> = ({
  imageSrc = "",
  label = "",
  customClass = "",
  customAttrs = {},
  fontSize = "",
  userId = "",
}) => {
  const [styleAvatar, setStyleAvatar] = useState("");

  useEffect(() => {
    if (userId !== String(Global.ADMIN_ID)) {
      GetById(userId).then((res: any) => {
        if (res?.user?.borderAvatar) {
          setStyleAvatar(res.user.borderAvatar);
        }
      }).catch(console.error);
    }
  }, [userId]);

  return (
    <div
      className={`
        profile-pic text-white 
        w-full h-full
        avatar-rounded
        flex items-center justify-center
        uppercase font-bold
        ${userId === String(Global.ADMIN_ID) && "border border-3 border-danger"} 
        ${fontSize || "fs-5"} text-uppercase w-100 h-100 ${customClass}`}
      style={{
        border: `2px solid ${styleAvatar ? `${styleAvatar}` : "white"}`,
      }}
      {...customAttrs}
    >
      {imageSrc ? (
        <img
          loading="lazy"
          role="presentation"
          decoding="async"
          src={imageSrc || '/images/default-avatar.svg'}
          alt={label}
          className="w-100"
        />
      ) : (
        <>{label.split("")[0]}</>
      )}
    </div>
  );
};

export default memo(Avatar, isEqual);
