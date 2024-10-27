import clsx from "clsx";
import { Fragment, useEffect, useMemo, } from "react";
import { Link } from "react-router-dom";
import LocalStorageKeys from "../../constants/local-storage-keys";

const role = Number(localStorage.getItem(LocalStorageKeys.ROLE));

function Menuloop({ MENUITEMS, toggleSidemenu, level }: any) {
  const isHidden = MENUITEMS.class.includes("hidden");
  const isNotAllow = MENUITEMS.notAllowRoles.includes(role);

  if (isNotAllow) {
    return;
  }

  if (isHidden) return null;

  return (
    <Fragment>
      <Link
        to={MENUITEMS.path}
        className={`${isNotAllow && 'hidden'} side-menu__item d-flex align-items-center ${MENUITEMS?.selected ? "active" : ""}`}
        onClick={(event) => {
          toggleSidemenu(event, MENUITEMS);
        }}
      >
        {MENUITEMS.icon}
        <span className={clsx(level === 1 ? "side-menu__label" : "", MENUITEMS.class)}>
          {MENUITEMS.title}
        </span>
      </Link>
      <ul
        className={`slide-menu child${level} ${MENUITEMS.active ? "double-menu-active" : ""}`}
        style={MENUITEMS.active ? { display: "block" } : { display: "none" }}
      >
        {level <= 1 && (
          <li className="slide side-menu__label1">
            <Link to="#!">{MENUITEMS.title}</Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
}

export default Menuloop;
