import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function YourTicket() {
  const [dataApi, setDataApi] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get("http://localhost:3030/bus");
    setDataApi(res.data);
  };
  function onDelete(e) {
    axios.patch(`http://localhost:3030/bus/${e}`, {
      bookedSeat: [],
    });
  }
  return (
    <div>
      <Navbar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20% 20% 20% 20%",
            justifyContent: "space-evenly",
            marginTop: "60px",

          }}
        >
          {dataApi.filter(d => d.bookedSeat.length > 0).map((value, i, a) => {
            return (
              <form
                style={{
                  height: "350px",
                  overflow: "hidden",
                  width: "300px",
                  border: "1px solid black",
                  margin: "30px 0px",
                  backgroundColor: "RGB(240, 255, 244, 0.5)",
                  borderRadius: "8px"
                }}
                key={i}
              >
                <div style={{ padding: "0px 0px 0px 0px" }}>
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src={a[i].image}
                    alt="imgsrc"
                  ></img>
                  <h6
                    style={{
                      margin: "10px",
                      textAlign: "center",
                      fontWeight: "800",
                      color: "RGB(0,0,0, 0.8)",
                    }}
                  >
                    Name: {value?.name} <br />
                    location : {value?.location} <br />
                    Seats no:<h6 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {value?.bookedSeat.map((sNo, i) => <span key={i} style={{ width: "30px", height: '30px', fontSize: '20px', backgroundColor: 'gray', color: "white", borderRadius: '50%' }}>{sNo}</span>)}
                    </h6>
                  </h6>
                </div>
                <button
                  className="btn btn-danger"
                  style={{
                    margin: "10px 0 0 35%",
                  }}
                  onClick={() => {
                    onDelete(value.id);
                  }}
                >
                  Remove
                </button>
              </form>
            );
          })}
        </div> 
    </div>
  );
}

export default YourTicket;
