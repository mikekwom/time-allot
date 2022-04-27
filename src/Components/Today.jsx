import React from "react";
import Card from "./Card";
import Modal from "./Modal";
import data from "../data";

function Today(props) {
  let today = new Date().toLocaleDateString();

  const cards = data.map((item) => {
    return <Card key={item.id} item={item} />;
  });

  return (
    <div className="today">
      <div className="today--top">
        <h2>Todays Goals - {today}</h2>
        <button
          type="button"
          className="btn btn-primary addBtn"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add Goal
        </button>
        <Modal />
      </div>

      <section className="cards-list">{cards}</section>
    </div>
  );
}

export default Today;
