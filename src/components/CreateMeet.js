import React, { useState, useEffect } from 'react';
import Header from './Header';
import { countries } from '../mock/country';
import './CreateMeet.scss';
import DatePicker from 'react-widgets/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import Map from './Map';
import { formatDate } from './Helper/formatDate';
import { onSubmit } from './Helper/postFormDate';
import { Link } from 'react-router-dom';

export default function CreateMeet() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { register, handleSubmit, control } = useForm();

  return (
    <>
      <Header />
      <div className="createmeet d-flex">
        <form
          className="createmeet__form d-flex  mt-5 flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="form-group createmeet__form-title">
            <input
              type="text"
              class="form-control"
              placeholder="Enter title"
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
                      defaultValue={new Date()}
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
                onChange={(event) => setLatitude(event.target.value)}
              />
              <input
                type="number"
                class="form-control"
                placeholder="longitude"
                {...register('longitude')}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </div>
          </div>
          <div class="form-group createmeet__form-conutry">
            <label for="exampleFormControlSelect">Country</label>
            <select class="form-control" {...register('Country')}>
              {countries.map((country) => (
                <option>{country.name}</option>
              ))}
            </select>
          </div>
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
        <Map draggable={true} long={Number(longitude)} lat={Number(latitude)} />
      </div>
    </>
  );
}
