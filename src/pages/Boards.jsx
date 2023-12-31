import "../assets/style/Board.css";
import logoImg from "../assets/images/sidebar/logo.png";
import boardImg from "../assets/images/sidebar/board.png";
import templateImg from "../assets/images/sidebar/templates.svg";
import supportImg from "../assets/images/sidebar/support.png";
import BudgetCard from "../components/Board/Card";

// const url = 'https://i.pinimg.com/564x/cf/c9/34/cfc93421e61fc7fa8808da67bb789ecb.jpg';

const Boards = () => {
  const budgets = [
    {
      budget_id: 1,
      budget_name: "Organize your ideas today",
      budget_amount: 1000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 2,
      budget_name: "Budget 2",
      budget_amount: 2000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 1,
      budget_name: "Organize your ideas today",
      budget_amount: 1000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 2,
      budget_name: "Budget 2",
      budget_amount: 2000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 1,
      budget_name: "Budget 1",
      budget_amount: 1000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 2,
      budget_name: "Organize your ideas today Organize your ideas today",
      budget_amount: 2000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 1,
      budget_name: "Budget 1",
      budget_amount: 1000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 2,
      budget_name: "Budget 2",
      budget_amount: 2000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },
    {
      budget_id: 2,
      budget_name: "Budget 2",
      budget_amount: 2000,
      budget_type: "Monthly",
      budget_start_date: "2021-08-01",
      budget_end_date: "2021-08-31",
    },

  ];
  return (
    <div className="section" style={{ height: "100vh", position: "relative" }}>
      <div
        className="d-flex"
        style={{ position: "absolute", zIndex: 2, top: 0, width: "100%" }}
      >
        {/* Left side sidebar */}
        {/* <nav
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
        </nav> */}

        <div className="flex-fill menu-bars">
          <div className="row py-3">
            <div className="col-lg-6 col-md-6 col-6">
              <h2 className="heading-font">
                Your visual boards
              </h2>
            </div>
            <div className="col-lg-6 col-md-6 col-6">
              <button type="button" className="btn btn-primary nav-button float-right"
                style={{ backgroundColor: "#6535C6", border: "none", fontWeight: 600 }}
              >
                <span>+</span> New Board
              </button>
            </div>
          </div>
          <div className="row">
            {budgets && budgets.length > 0 ? (
              budgets.map((budget, indx) => {
                return (
                  <BudgetCard
                    key={`${indx}-${budget.budget_id}`}
                    indx={indx}
                    board={budget}
                  />
                );
              })
            ) : (
              <center className="align-items-center justify-content-center d-flex my-5">
                <div className="d-block">
                  <h4><b>Organize your ideas today</b></h4>
                  <p>Create your first visual board in a matter of seconds</p>
                  <button type="button" className="btn btn-primary nav-button"
                    style={{ backgroundColor: "#6535C6", border: "none", fontWeight: 600 }}>
                    Create visual board
                  </button>
                </div>
              </center>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
