import axios from 'axios';
export const onSubmit = async (data) => {
  let formData = new FormData();

  Object.keys(data).forEach(function (datakey) {
    formData.append(datakey, data[datakey]);
  });
  axios({
    method: 'post',
    url: 'http://localhost:80/meets',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};
