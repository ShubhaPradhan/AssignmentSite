import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Alert from "../components/alert";

import { useState } from "react";

import { useGlobalContext } from "../context";

const Assignment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByType, setSortByType] = useState("");
  const [sortBySubject, setSortBySubject] = useState("");

  const { user, assignment, updateAssignment, alert, setAlert, showAlert } = useGlobalContext();

  // BECAUSE VAR_NAME IS CONFLICTING BELOW
  let userId = "";
  if(user){
   userId = user.user_id;
  }

  return (
    <section className="assignment main">
      { alert.show && <Alert {...alert} removeAlert={showAlert} list={assignment} /> }
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
              <Link to="/upload-assignment">
              <button className="primary">
                <div className="overlay"></div>
                <span>Contribute</span>
              </button>
              </Link>
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
                id="search"
                onChange={(e) => {
                  setSortByType("");
                  setSortBySubject("");
                  setSearchTerm(e.target.value)
                }
                }
                placeholder="Search Assignments"
              />
              <FaSearch className="search-icon"></FaSearch>
            </div>
            <div className="divider"></div>
            <div className="assignment-type">
              <select 
              name="assignment_type" 
              id="assignment_type" 
              onChange={(e) => {
                setSearchTerm("");
                setSortBySubject("");
              setSortByType(e.target.value)}
              }>
                <option value="">Sort By Type</option>
                <option value="assignment">Assignment</option>
                <option value="lab">Lab</option>
              </select>

            </div>
            <div className="subject">
              <select name="subject" id="subject" onChange={(e) => {
                setSearchTerm("");
                setSortByType("");
                setSortBySubject(e.target.value)}
              }
              >
                <option value="">Sort By Subject</option>
                <option value="Statistics">Statistics</option>
                <option value="Numerical Method">Numerical Method</option>
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
          {
            assignment.filter((value) => {
              if(searchTerm === "" && sortByType === "" && sortBySubject === ""){
                return value;
              }
              if(searchTerm !== ""){
                return value.title.toLowerCase().includes(searchTerm.toLowerCase());
              } 
              else if(sortByType !== ""){
                return value.assignment_type.toLowerCase().includes(sortByType.toLowerCase());
              }
              else if(setSortBySubject !== ""){
                return value.subject.toLowerCase().includes(sortBySubject.toLowerCase());
              }
            }).map((item) => {
          
              const { user, id,  username, title, subject, assignment_type, assignment_file, description } = item;

              return (
          
                  <div className="card" key={id}>
                    <div className="image">
                      <img src="static/images/latestassignment.png" alt="" />
                      <div className="pill">
                        <p>{assignment_type}</p>
                      </div>
                    </div>
                    <div className="lower">
                      <div className="info">
                        <p>{title}</p>
                        <p>{subject}</p>
                        <p>{description}</p>
                        <p>By {username}</p>
                      </div>
                      <div className="buttons">
                        <a href={assignment_file}>
                          <button className="primary">
                            <div className="overlay"></div>
                            <span>View</span>
                          </button>
                      </a>
                        <a href={assignment_file} className="alternate" download>
                          <div className="overlay"></div>
                          <span>Download</span>
                        </a>
                    { user === userId ?  <Link to={`/update-assignment/${id}`}>
                          <button className="primary">
                            <div className="overlay"></div>
                            <span>Update</span>
                          </button>
                        </Link>: null
                    }
                      { user === userId ?  <Link to={`/delete-assignment/${id}`}>
                          <button className="primary">
                            <div className="overlay"></div>
                            <span>Delete</span>
                          </button>
                        </Link>: null
                    }
                      </div>
                    </div>
                  </div>
             
              );
            }).reverse()
         }
          </div>
        </div>
      </div>
      {/* LATEST ASSIGNMENTS */}
    </section>
  );
};

export default Assignment;
