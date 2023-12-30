import PropsTypes from "prop-types";

const CloseIcon = ({ x, y, onClick }) => (
  <div
    style={{
      position: "absolute",
      top: y + 63,
      left: x + 275,
      cursor: "pointer",
      fontSize: "25px",
      color: "white",
      background: "gray",
      borderRadius: "50%",
      width: "35px",
      height: "35px",
      textAlign: "center",
    }}
    onClick={onClick}
  >
    ✕
  </div>
);

export default CloseIcon;

CloseIcon.propTypes = {
  x: PropsTypes.number.isRequired,
  y: PropsTypes.number.isRequired,
  onClick: PropsTypes.func.isRequired,
};
