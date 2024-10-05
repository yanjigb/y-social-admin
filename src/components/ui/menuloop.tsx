import { Fragment } from "react";
import { Link } from "react-router-dom";

function Menuloop({ MENUITEMS, toggleSidemenu, level }: any) {
  return (
    <Fragment>
      <Link
        to={MENUITEMS.path}
        className={`side-menu__item d-flex align-items-center ${MENUITEMS?.selected ? "active" : ""}`}
        onClick={(event) => {
          toggleSidemenu(event, MENUITEMS);
        }}
      >
        {MENUITEMS.icon}
        <span className={`${level == 1 ? "side-menu__label" : ""}`}>
          {MENUITEMS.title}
        </span>
      </Link>
      <ul
        className={`slide-menu child${level}  ${
          MENUITEMS.active ? "double-menu-active" : ""
        }  `}
        style={MENUITEMS.active ? { display: "block" } : { display: "none" }}
      >
        {level <= 1 ? (
          <li className="slide side-menu__label1">
            <Link to="#!">{MENUITEMS.title}</Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </Fragment>
  );
}

export default Menuloop;
