import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./bus.css"
import { Link } from "react-router-dom";

function UserDashboard() {
  const [dataApi, setDataApi] = useState([]);
  const [selectedBus, setSelectedBus] = useState({})
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(`http://localhost:3030/bus`);
    setDataApi(res.data);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          marginLeft: "35%",
          flexDirection: "column",
        }}
      >
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20% 20% 20% 20%",
            justifyContent: "space-evenly",
            marginTop: "60px",
          }}
        >
          {" "}
          {dataApi
            .map((value, i, a) => {
              return (
                <form
                  style={{
                    height: "47vh",
                    overflow: "hidden",
                    width: "100%",
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
                      src={value?.image}
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
                      AvalableTickets:{value?.AvalableTickets - value?.bookedSeat.length}
                      <br />
                    </h6>
                  </div>
                  {value?.AvalableTickets > 0 ? <Link to={`/BookTickets/${value.id}`} style={{ textDecoration: "none" }} >
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{
                        margin: "10px 0px 0px 30%",

                        display: "flex",
                        alignItems: 'center',
                        justifyContent: "center"

                      }}
                      onClick={() => {
                        setSelectedBus(value)
                      }}
                    >
                      BOOK NOW
                    </button>
                  </Link> : <button
                    type="button"
                    className="btn btn-info"
                    disabled
                    style={{
                      margin: "10px 0px 0px 30%",
                      display: "flex",
                      alignItems: 'center',
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    Tickets Full
                  </button>}
                </form>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
