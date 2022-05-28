import React, { useState } from "react";
import axios from "axios";

function Cards(props) {
  const [hours, setHours] = useState(0);

  let bodyObj = {
    id: props.item.id,
    hours: props.item.dedicated_time,
  };

  React.useEffect(() => {
    setHours(+props.item.dedicated_time);
  }, []);

  function deleteGoal(id) {
    axios
      .delete(`http://localhost:4000/today/delete/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location.reload();
  }

  function markComplete(id) {
    axios
      .post(`http://localhost:4000/today/complete/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location.reload();
  }

  function minus15mins() {
    if (hours === 0) {
      return;
    } else {
      bodyObj.hours = +hours - 0.25;
      axios
        .post(`http://localhost:4000/today/update`, bodyObj)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      setHours((prevHours) => prevHours - 0.25);
    }
  }

  function plus15mins() {
    bodyObj.hours = +hours + 0.25;
    axios
      .post(`http://localhost:4000/today/update`, bodyObj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setHours((prevHours) => prevHours + 0.25);
  }
  function plus30mins() {
    bodyObj.hours = +hours + 0.5;
    axios
      .post(`http://localhost:4000/today/update`, bodyObj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setHours((prevHours) => prevHours + 0.5);
  }
  function plus1hr() {
    bodyObj.hours = +hours + 1;
    axios
      .post(`http://localhost:4000/today/update`, bodyObj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setHours((prevHours) => prevHours + 1);
  }

  return (
    <>
      <div className="card">
        <section className="item--header">
          <p>{props.item.name}</p>
          <div className="item--header-hours">
            <p className="stopWatch">{hours}</p>
            <p>/{props.item.target_hours} hours</p>
          </div>
        </section>
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${Math.floor((hours / props.item.target_hours) * 100)}%`,
            }}
          ></div>
        </div>
        <section className="card--time-btns">
          <button
            className="change--time-btn btn btn-success"
            onClick={plus15mins}
          >
            +15mins
          </button>
          <button
            className="change--time-btn btn btn-success"
            onClick={plus30mins}
          >
            +30mins
          </button>
          <button
            className="change--time-btn btn btn-success"
            onClick={plus1hr}
          >
            +1hr
          </button>
          <button
            className="changeTimeBtn btn btn-danger"
            onClick={minus15mins}
          >
            -15mins
          </button>

          <button
            className="card--deleteBtn btn btn-danger"
            onClick={() => deleteGoal(props.item.id)}
          >
            Delete
          </button>
          <button
            className="card--completteBtn btn btn-success"
            onClick={() => markComplete(props.item.id)}
          >
            Complete
          </button>
        </section>
      </div>
    </>
  );
}

export default Cards;
