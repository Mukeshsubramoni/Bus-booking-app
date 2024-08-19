import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./bus.css";
import { Button, Modal } from "react-bootstrap";
import Navbar from "./Navbar";

export default Selection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState({});
  const [bookingStep, setBookingStep] = useState("seatSelection");
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(`http://localhost:3030/bus/${id}`);
    setDataApi(res.data);
    setSelectedSeats(res.data.bookedSeat);
  };
  async function addSave() {
    await axios.put(`http://localhost:3030/bus/${id}`, {
      ...dataApi,
      bookedSeat: [...selectedSeats],
    });
  }

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const handleProceedToBooking = () => {
    if (selectedSeats.length > 0) {
      setBookingStep("ticketBooking");
    }
  };
  const handleConfirmBooking = (e) => {
    navigate("/YourTicket");
  };
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingStep === "ticketBooking" && (
            <div>
              <p>Selected Seats: {selectedSeats.join(", ")}</p>
              <Button
                onClick={() => {
                  handleConfirmBooking();
                }}
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <div key={dataApi}>
          <h3>Bus Name :{dataApi.name}</h3>
          <h4>Location :{dataApi.location}</h4>
          <h4>
            Avalable Tickets :{dataApi.AvalableTickets - selectedSeats.length}
          </h4>
          <div className="seat-grid">
            {Array.from({ length: 10 }, (_, index) => {
              const seatNumber = index + 1;
              const isBooked = selectedSeats.includes(seatNumber);
              return (
                <div>
                  <label
                    key={seatNumber}
                    className={`seat ${isBooked ? "booked" : ""}`}
                  >
                    <input
                      className="seat"
                      type="checkbox"
                      checked={isBooked}
                      disabled={isBooked}
                      onChange={() => handleSeatSelect(seatNumber)}
                      style={{ visibility: "hidden" }}
                    />
                    {seatNumber}
                  </label>
                </div>
              );
            })}
          </div>
          <Button
            variant="primary"
            onClick={() => (
              setModalShow(true), addSave(dataApi), handleProceedToBooking()
              //   setModalShow(true), handleProceedToBooking(), addSave(dataApi);
            )}
          >
            Proceed to conform Booking
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </>
  );
};
