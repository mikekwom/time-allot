import React from "react";

function Modal() {
  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add a Goal</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <form className="modal-body">
            <div className="mb-3 mt-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                name="title"
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Hours:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter total hours"
                name="hours"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
