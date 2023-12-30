const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="row card">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="">
            <h2>Page Not Found :</h2>
          </div>
          <div className="text-center">
            <button className="btn home-link-btn">
              {" "}
              {/* <BiHome fontSize={"25"} style={{marginRight: '5'}} /> */}
              Return to dashbord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
