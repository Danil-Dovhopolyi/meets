import React from 'react';
import { Link } from 'react-router-dom';

export default function Meet({ meet, deleteMeet }) {
  return (
    <div className="list-group meet m-2 d-flex">
      <a
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start w-80"
      >
        <div class="d-flex w-100 justify-content-between ">
          <h5 class="mb-1">{meet.Title}</h5>
          <small>{meet.DateMeet}</small>
        </div>
        <div className="meet__functionality d-flex justify-content-between m-3">
          <Link
            type="button"
            className="btn btn-info w-25"
            to={`/info?id=${meet?.Id}`}
          >
            Info
          </Link>
          <button
            className="meet__btn btn btn-danger w-25 "
            style={{ opacity: 0.95 }}
            onClick={() => deleteMeet(meet.Id)}
          >
            Delete
          </button>
          <Link
            to={`/edit?id=${meet?.Id}`}
            type="button"
            class="btn btn-warning w-25"
          >
            Edit
          </Link>
        </div>
      </a>
    </div>
  );
}
