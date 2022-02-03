import React from "react";
import { FaSearch } from "react-icons/fa";
import { assignment } from "../data";

const Assignment = () => {
  return (
    <section className="assignment main">
      {/* BANNER */}
      <div className="banner">
        <div className="top-content">
          <div className="left">
            <div className="content">
              <h1>
                Find Your <br></br>Assignments Here
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cupiditate vitae neque labore eveniet sapiente officiis qui
                fuga. Optio, perspiciatis eligendi.
              </p>
              <button className="primary">
                <div className="overlay"></div>
                <span>Contribute</span>
              </button>
            </div>
          </div>
          <div className="right">
            <img src="static/images/assignmentbanner.svg" alt="banner" />
          </div>
        </div>

        {/* SEARCH ASSIGNMENT */}
        <div className="search">
          <form action="" className="search-box">
            <div className="searchbar">
              <span className="icon"></span>
              <input
                type="text"
                name="search"
                placeholder="Search Assignments"
              />
              <FaSearch className="search-icon"></FaSearch>
            </div>
            <div className="divider"></div>
            <div className="labsheet">
              <select name="labsheet" id="labsheet">
                <option value="">Lab Sheet</option>
                <option value="Theory of Computation">
                  Theory of Computation
                </option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="DBMS">DBMS</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
              </select>
            </div>
            <div className="subject">
              <select name="labsheet" id="labsheet">
                <option value="">Sort By Subject</option>
                <option value="Theory of Computation">
                  Theory of Computation
                </option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="DBMS">DBMS</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
              </select>
            </div>
          </form>
        </div>
      </div>
      {/* SEARCH ASSIGNMENT */}
      {/* BANNER */}
      {/* LATEST ASSIGNMENTS */}
      <div className="latest-assignments container">
        <h2 className="sub-heading">Latest Assignments & Labs : </h2>
        <div className="content">
          <div className="row">
            {assignment.map((item, index) => {
              const { id, title, subject, uploader, image, type } = item;
              return (
                <>
                  <a href="#/" className="card" key={id}>
                    <div className="image">
                      <img src="static/images/latestassignment.png" alt="" />
                      <div className="pill">
                        <p>{type}</p>
                      </div>
                    </div>
                    <div className="lower">
                      <div className="info">
                        <p>{title}</p>
                        <p>{subject}</p>
                        <p>By {uploader}</p>
                      </div>
                      <div className="buttons">
                        <button href="/assignments" className="primary">
                          <div className="overlay"></div>
                          <span>View</span>
                        </button>
                        <button href="/assignments" className="alternate">
                          <div className="overlay"></div>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </a>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {/* LATEST ASSIGNMENTS */}
    </section>
  );
};

export default Assignment;
