import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "./types";

export type NavMenuProps = {
  user: User | undefined;
  onLogoutClick: () => void;
};

export const NavMenu = (props: NavMenuProps) => {
  const { user, onLogoutClick } = props;
  const [isOpen, setOpen] = React.useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/waiting-lists">
          順番待ちリスト
        </Link>
        {user ? (
          <>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setOpen(!isOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={"collapse navbar-collapse" + (isOpen ? " show" : "")}
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/waiting-lists"
                    activeClassName="active"
                  >
                    待ちリスト
                  </NavLink>
                </li> */}
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-link p-0 nav-link active"
                    onClick={onLogoutClick}
                  >
                    ログアウト
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>{" "}
    </nav>
  );
};

export default NavMenu;
