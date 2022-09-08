import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Controller, useForm } from 'react-hook-form';
import { countries } from '../mock/country';
import axios from 'axios';
import DatePicker from 'react-widgets/DatePicker';
import { formatDate } from './Helper/formatDate';
import { formatDateToDatabase } from './Helper/formatDateForDB';
import { Link } from 'react-router-dom';

export default function EditMeet() {
  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const [meet, setMeet] = useState();

  useEffect(() => {
    const params = new URL(document.location.href).searchParams;
    const id = params.get('id'); // "1"
    axios
      .get(`http://localhost:80/meets/${id}`)
      .then((response) => {
        setFormValues(response.data);
        setMeet(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function setFormValues(meet) {
    setValue('Title', meet.Title);
    setValue('Country', meet.Country);
    setValue('DateMeet', formatDateToDatabase(meet.DateMeet));
    setValue('longitude', meet.longitude);
    setValue('latitude', meet.latitude);
  }

  const onSubmit = (data) => {
    const params = new URL(document.location.href).searchParams;
    const id = params.get('id');
    axios
      .patch(`http://localhost:80/meets/${id}`, { ...getValues() })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <>
      <Header />
      <div className="createmeet d-flex align-items-center">
        <form
          className="createmeet__form d-flex m-auto mt-5 flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="form-group createmeet__form-title">
            <input
              type="text"
              class="form-control"
              placeholder="edit"
              {...register('Title')}
            />
          </div>
          <div className="createmeet__form-date d-flex m-0 ">
            <div className="d-flex align-items-center">
              <Controller
                control={control}
                name="DateMeet"
                render={({ field }) => (
                  <div className="date">
                    <DatePicker
                      className="w-3/5 m-0"
                      onChange={(date) => field.onChange(formatDate(date))}
                      selected={field.value}
                    />
                  </div>
                )}
              />
            </div>
            <div className="createmeet__coords d-flex align-items-center">
              <input
                type="number"
                class="form-control m-1"
                placeholder="latitude"
                {...register('latitude')}
              />
              <input
                type="number"
                class="form-control"
                placeholder="longitude"
                {...register('longitude')}
              />
            </div>
          </div>
          <div class="form-group createmeet__form-conutry">
            <label for="exampleFormControlSelect">Country</label>
            <select
              class="form-control"
              {...register('Country')}
              value={meet?.Country}
            >
              {countries.map((country) => (
                <option>{country.name}</option>
              ))}
            </select>
          </div>
          <div className="createmeet__form-map"></div>
          <div className="createmeet__form-btns d-flex justify-content-between">
            <div className="createmeet__form-unsubmit">
              <Link to={'/'} type="button" class="btn btn-danger">
                Back
              </Link>
            </div>
            <div className="createmeet__form-submit">
              <button type="submit" class="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
