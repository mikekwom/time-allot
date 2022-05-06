import React from "react";
import Card from "./Card";
import Modal from "./Modal";
import Totals from "./Totals";
import axios from "axios";

function Today() {
  let today = new Date().toLocaleDateString();

  const userEmail = window.localStorage.getItem("email");

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:4000/today/${userEmail}`).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, []);

  const cards = data.map((item) => {
    // console.log(item);
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
      <Totals />
    </div>
  );
}

export default Today;
