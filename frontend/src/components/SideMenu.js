import React from "react";
import "./SideMenu.css";
import { useStateValue } from "../StateProvider";
import CloseIcon from "@material-ui/icons/Close";

function SideMenu(props) {
  const [{ menu }, dispatch] = useStateValue();
  const openMenu = () => {
    dispatch({
      type: "TOGGLE_MENU",
    });
  };

  return (
    <div className={`sidemenu ${menu ? "open" : ""}`}>
      <div className="sidemenu__header">
        <h3>Hello, Sign In</h3>
        <button onClick={openMenu}>
          <CloseIcon />
        </button>
      </div>
      <ul className="sidemenu__category">
        <li>category</li>
        <li>category</li>
        <li>category</li>
        <li>category</li>
        <li>category</li>
        <li>category</li>
        <li>category</li>
      </ul>
    </div>
  );
}

export default SideMenu;
