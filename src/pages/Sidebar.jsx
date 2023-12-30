import React from 'react'
import "../assets/style/Board.css";
import logoImg from "../assets/images/sidebar/logo.png";
import boardImg from "../assets/images/sidebar/board.png";
import templateImg from "../assets/images/sidebar/templates.svg";
import supportImg from "../assets/images/sidebar/support.png";

const Sidebar = () => {
    return (
        <div>
            <nav
                id="sidebar"
                className="col-md-1 d-md-block bg-light sidebar"
                style={{ width: "100px" }}
            >
                <ul className="nav flex-column">
                    <li className="nav__list-item" title="Home">
                        <a className="nav-link" href="#">
                            <img src={logoImg} alt="" />
                        </a>
                    </li>
                    <li className="nav__list-item" title="Boards">
                        <a className="nav-link" href="#">
                            <img src={boardImg} alt="" />
                        </a>
                    </li>
                    <li className="nav__list-item" title="Templates">
                        <a className="nav-link" href="#">
                            <img src={templateImg} alt="" />
                        </a>
                    </li>
                    <li className="nav__list-item" title="Support">
                        <a className="nav-link" href="#">
                            <img src={supportImg} alt="" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
