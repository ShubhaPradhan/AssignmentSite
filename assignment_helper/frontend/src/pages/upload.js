import React from "react";
import { useGlobalContext } from "../context";
import { useNavigate, Link, Navigate } from "react-router-dom";

const Upload = () => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to={`/login`} replace />;
  } else {
    return (
      <>
        <section className="upload-assignment">
          <div className="upload-container">
            <div className="upload-image">
              <img src="/static/images/upload.svg" alt="" />
            </div>
            <div className="upload-form">
              <h3 className="form-title">Upload Assignment</h3>
              <form action="">
                <div className="input-field">
                  <input type="text" id="title" />
                  <label htmlFor="title" className="label">
                    Assignment Title
                  </label>
                </div>
                <div className="input-field">
                  <select name="Subject" id="Subject">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label htmlFor="title" className="label">
                    Subject
                  </label>
                </div>

                <div className="input-field">
                  <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label htmlFor="assignmentType" className="label">
                    Assignment Type
                  </label>
                </div>

                <div className="input-field">
                  <input type="file" id="file" />
                  <label htmlFor="file" className="label">
                    Assignment File
                  </label>
                </div>

                <div className="input-field">
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                </div>
                <button className="primary" type="submit">
                  <div className="overlay"></div>
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Upload;
