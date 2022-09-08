import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Meet from './Meet';

const AllMeats = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const deleteMeet = (id) => {
    axios.delete(`http://localhost:80/meets/${id}`).then((response) => {
      setData(
        data.filter((meet) => {
          return meet.Id !== id;
        })
      );
    });
  };
  const getData = () => {
    setLoading(true);
    axios
      .get('http://localhost:80/meets')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div className="meets">
          {data.map((meet) => (
            <Meet meet={meet} deleteMeet={deleteMeet} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllMeats;
