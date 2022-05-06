import { React, useState, useEffect } from "react";
import axios from "axios";

function CircleCard(props) {
  const userEmail = window.localStorage.getItem("email");
  const [goalNameSum, setGoalNameSum] = useState([]);

  let bodyObj = {
    id: props.item.id,
    userEmail: userEmail,
    goalName: props.item.name,
  };

  useEffect(() => {
    axios
      .post(`http://localhost:4000/today/totals/graphs`, bodyObj)
      .then((res) => {
        console.log(`Res.data: ${JSON.stringify(res.data[0].sum)}`);
        console.log(bodyObj.goalName);
        setGoalNameSum(res.data[0].sum);
      })
      .catch((err) => console.log(err));
  }, []);

  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/today/totals/${userEmail}`)
      .then((res) => {
        console.log(res.data[0].sum);
        setTotalHours(res.data[0].sum);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="circle-card">
      <div className="circle-card--title">{props.item.name}</div>
      <div className="progress progress-round blue">
        {/* <span className="progress-left">
          <span
            className="progress-bar"
            style={{ width: Math.floor((goalNameSum / totalHours) * 100) }}
          ></span>
        </span>
        <span className="progress-right">
          <span className="progress-bar"></span>
        </span> */}
        <div className="progress-value">
          {Math.floor((goalNameSum / totalHours) * 100)}%
        </div>
      </div>
      <div className="circle-card--hours">{goalNameSum} hours</div>
    </div>
  );
}

export default CircleCard;
