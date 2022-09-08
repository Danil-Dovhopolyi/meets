export const formatDateToDatabase = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear().toString();
  let v = [month, day, year.substring(2, 4)].join('/');
  return v;
};
