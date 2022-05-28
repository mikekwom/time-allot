import React from "react";
import CircleCard from "./CircleCard";
import axios from "axios";

function Totals() {
  const userEmail = window.localStorage.getItem("email");
  const [totalHours, setTotalHours] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/today/totals/${userEmail}`)
      .then((res) => {
        console.log(res.data[0].sum);
        setTotalHours(res.data[0].sum);
      })
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:4000/today/${userEmail}`).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, []);

  const circleCards = data.map((item) => {
    // console.log(item);
    return <CircleCard key={item.id} item={item} />;
  });

  return (
    <section className="totals">
      <h4>Total Time Dedicated: {totalHours} hours</h4>

      <section className="circle-cards-list">{circleCards}</section>
    </section>
  );
}

export default Totals;
