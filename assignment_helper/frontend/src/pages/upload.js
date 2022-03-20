import React, {  useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import {  Navigate } from "react-router-dom";

const Upload = () => {
  const {
    user,
    assignmentTitle,
    setAssignmentTitle,
    assignmentType,
    setAssignmentType,
    assignmentFile,
    setAssignmentFile,
    assignmentSubject,
    setAssignmentSubject,
    assignmentDescription,
    setAssignmentDescription,
    createAssignment,
    updateAssignment,
    getAssignmentData,
    isUpdate, 
    setIsUpdate,
  } = useGlobalContext();


  
  useEffect(() => {
    if (window.location.pathname.includes("/update-assignment/")){
      getAssignmentData();
    };
  }, []);


  const handleAssignmentTitle = (e) => {
    setAssignmentTitle(e.target.value);
  };

  const handleAssignmentType = (e) => {
    setAssignmentType(e.target.value);
  };

  const handleAssignmentFile = (e) => {
    setAssignmentFile(e.target.files);
  };

  const handleAssignmentSubject = (e) => {
    setAssignmentSubject(e.target.value);
  };

  const handleAssignmentDescription = (e) => {
    setAssignmentDescription(e.target.value);
  };


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
              <form onSubmit={isUpdate ? updateAssignment : createAssignment}  encType="multipart/form-data">
                <div className="input-field">
                  <input
                    type="text"
                    id="title"
                    onChange={handleAssignmentTitle}
                    value={assignmentTitle}
                  />
                  <label htmlFor="title" className="label">
                    Assignment Title
                  </label>
                </div>
                <div className="input-field">
                  <select
                    name="subject_choices"
                    id="subject_choices"
                    onChange={handleAssignmentSubject}
                    value={assignmentSubject}
                  >
                    <option value="">Select Subject</option>
                    <option value="statistics">Statistics</option>
                    <option value="numerical method">Numerical Method</option>
                  </select>
                  <label htmlFor="subject_choices" className="label">
                    Subject
                  </label>
                </div>

                <div className="input-field">
                  <select
                    name="assignment_choices"
                    id="assignment_choices"
                    onChange={handleAssignmentType}
                    value={assignmentType}
                  >
                   <option value="">Select Subject Type</option>
                    <option value="assignment">Assignment</option>
                    <option value="lab">Lab</option>
                  </select>
                  <label htmlFor="assignment_choices" className="label">
                    Assignment Type
                  </label>
                </div>

                <div className="input-field">
                  <input
                    type="file"
                    id="file"
                    accept=".doc, .docx, .pdf, .txt, .jpeg, .png, .jpg"
                    onChange={handleAssignmentFile}
                  />
                  <label htmlFor="file" className="label">
                    Assignment File
                  </label>
                </div>

                <div className="input-field">
                  <textarea
                    name="description"
                    id="description"
                    cols="20"
                    rows="10"
                    onChange={handleAssignmentDescription}
                  >{assignmentDescription}</textarea>
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                </div>
                <button className="primary" type="submit">
                  <div className="overlay"></div>
                  <span>{isUpdate ? "Update" : "Post"}</span>
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
