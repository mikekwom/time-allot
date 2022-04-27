import React, { useState } from "react";

function Cards(props) {
  const [hours, setHours] = useState(0);

  function minus15mins() {
    if (hours === 0) {
      return;
    } else {
      setHours((prevHours) => prevHours - 0.25);
    }
  }

  function plus15mins() {
    setHours((prevHours) => prevHours + 0.25);
  }
  function plus30mins() {
    setHours((prevHours) => prevHours + 0.5);
  }
  function plus1hr() {
    setHours((prevHours) => prevHours + 1);
  }

  return (
    <div className="card">
      <section className="item--header">
        <p>{props.item.title}</p>
        <div className="item--header-hours">
          <p>
            {hours}/{props.item.goalHours} hours
          </p>
        </div>
      </section>
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${Math.floor((hours / props.item.goalHours) * 100)}%`,
          }}
        ></div>
      </div>
      <section className="card--time-btns">
        <button className="changeTimeBtn btn btn-danger" onClick={minus15mins}>
          -15mins
        </button>
        <button className="changeTimeBtn btn btn-success" onClick={plus15mins}>
          +15mins
        </button>
        <button className="changeTimeBtn btn btn-success" onClick={plus30mins}>
          +30mins
        </button>
        <button className="changeTimeBtn btn btn-success" onClick={plus1hr}>
          +1hr
        </button>
      </section>
    </div>
  );
}

export default Cards;
