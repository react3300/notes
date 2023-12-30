import logoImg from "../assets/images/sidebar/logo.png";
import boardImg from "../assets/images/sidebar/board.png";
import templateImg from "../assets/images/sidebar/templates.svg";
import supportImg from "../assets/images/sidebar/support.png";

export default function App() {
  return (
    <div className="col-lg-1 col-md-1 col-1">
      <ul className="sidenav__list">
        <li className="sidenav__list-item" title="Notemi">
          <img src={logoImg} alt="" />
        </li>
        <li className="sidenav__list-item" title="Boards">
          <img src={boardImg} alt="" />
        </li>
        <li className="sidenav__list-item" title="Templates">
          <img src={templateImg} alt="" />
        </li>
        <li className="sidenav__list-item" title="Conxxxxtact Us">
          <img src={supportImg} alt="" />
        </li>
      </ul>
    </div>
  );
}
