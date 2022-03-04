import React from "react";
import { useGlobalContext } from "../context";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <section className="landing-info">
      <div className="container">
        <div className="info">
          <h3 className="title">{user}</h3>
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
            <button href="/assignments" className="primary">
              <div className="overlay"></div>
              <span>Assignments</span>
            </button>
            <button href="/assignments" className="alternate">
              <div className="overlay"></div>
              <span>Contribute</span>
            </button>
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
