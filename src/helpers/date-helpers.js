const dateHelpers = {
  isToday: (input) => {
    let today = new Date();
    return (new Date(input)).toDateString() === today.toDateString();
  },
  isTomorrow: (input) => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    return (new Date(input)).toDateString() === today.toDateString();
  }
};

export default dateHelpers;
