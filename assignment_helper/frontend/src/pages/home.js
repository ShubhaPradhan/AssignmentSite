import React from "react";
import { useGlobalContext } from "../context";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="landing-info">
      <div className="container">
        <div className="info">
          <h3 className="title"></h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit est
            fugiat omnis rerum a laborum reprehenderit dignissimos.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit est
            fugiat omnis rerum a laborum reprehenderit, qui quia ducimus
            dignissimos.
          </p>
          <div className="buttons">
            <Link to="/assignment">
              <button className="primary">
              <div className="overlay"></div>
              <span>Assignments</span>
              </button>
            </Link>
            <Link to="/upload-assignment">
              <button className="alternate">
              <div className="overlay"></div>
              <span>Contribute</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="image">
          <img src="static/images/landing-image.svg" alt="Landing" />
        </div>
      </div>
    </section>
  );
};

export default Home;
