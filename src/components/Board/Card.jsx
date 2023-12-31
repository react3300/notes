import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import BudgetImg from "../../assets/images/boards/sher.svg";
import NinjaImg from "../../assets/images/boards/ninja.svg";

export default function BoardCard({ indx, board }) {
  const navigate = useNavigate();
  return (
    <div key={indx} className="col-lg-3 col-md-6 col-12 budget-summary-box">
      <div className="profile-pic mt-4">
        <div className="px-2">
          <p className="para-one">
            {moment(board?.budget_created_date).format("MMMM Do YYYY")}
          </p>
          <p
            className="heading-tag"
            href="#"
            onClick={() => navigate(`/board`)}
          >
            {board?.budget_name
              ? `${board.budget_name.substring(0, 35)}${
                  board.budget_name.length > 35 ? "..." : ""
                }`
              : ""}
          </p>
        </div>

        <img
          src={indx % 2 === 0 ? BudgetImg : NinjaImg}
          className="img-tab"
          alt=""
          onClick={() => navigate(`/board`)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

// Define PropTypes for your component
BoardCard.propTypes = {
  indx: PropTypes.number.isRequired, // Ensure indx is a number and is required
  board: PropTypes.shape({
    budget_created_date: PropTypes.string, // Adjust the type as per your data
    budget_name: PropTypes.string, // Adjust the type as per your data
  }).isRequired,
};
