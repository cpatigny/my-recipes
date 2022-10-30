const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  if (day.toString().length < 2) day = `0${day}`;
  if (month.toString().length < 2) month = `0${month}`;

  return `${day}/${month}/${year}`;
};

export default formatDate;
