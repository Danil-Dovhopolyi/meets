import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './InfoMeet.scss';
import Map from './Map';
export default function InfoMeet() {
  const [meet, setMeet] = useState();
  useEffect(() => {
    const params = new URL(document.location.href).searchParams;
    const id = params.get('id'); // "1"
    console.log(id);
    axios
      .get(`http://localhost:80/meets/${id}`)
      .then((response) => {
        setMeet(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteMeet = (id) => {
    axios.delete(`http://localhost:80/meets/${id}`);
  };
  return (
    <>
      <Header />
      <div className="wrapper ">
        <div className="content d-flex align-items-center justify-content-between ">
          <div className="meetinfo">
            <div className="meetinfo__text m-1">
              <h1>Meet</h1>
              <div className="meetinfo__title">
                <div class="form-group  d-flex align-items-baseline gap-1">
                  <div className="text">
                    <p>Title: </p>
                  </div>
                  <div className="input">
                    <input readOnly class="form-control" value={meet?.Title} />
                  </div>
                </div>
              </div>
              <div className="meetinfo__date">
                <div class="form-group  d-flex align-items-baseline gap-1">
                  <div className="text">
                    <p> Date: </p>
                  </div>
                  <div className="input">
                    <input
                      readOnly
                      class="form-control"
                      value={meet?.DateMeet}
                    />
                  </div>
                </div>
              </div>
              <div className="meetinfo__country">
                <div class="form-group d-flex align-items-baseline gap-1">
                  <div className="text">
                    <p> Country: </p>
                  </div>
                  <div className="input">
                    <input
                      readOnly
                      class="form-control"
                      value={meet?.Country}
                    />
                  </div>
                </div>
              </div>
              <div className="meetinfo__longitude">
                <div class="form-group d-flex align-items-baseline gap-1">
                  <div className="text">
                    <p>Logitude: </p>
                  </div>
                  <div className="input">
                    <input
                      readOnly
                      class="form-control"
                      value={meet?.longitude}
                    />
                  </div>
                </div>
              </div>
              <div className="meetinfo__latitude">
                <div class="form-group d-flex align-items-baseline gap-1">
                  <div className="text">
                    <p> Latitude: </p>
                  </div>
                  <div className="input">
                    <input
                      readOnly
                      class="form-control"
                      value={meet?.latitude}
                    />
                  </div>
                </div>
                <button
                  className="meet__btn btn btn-danger w-25 "
                  style={{ opacity: 0.95 }}
                  onClick={() => deleteMeet(meet.Id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
