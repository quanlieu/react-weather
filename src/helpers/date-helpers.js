const dateHelpers = {
  isToday: (input) => {
    let today = new Date();
    return (new Date(input)).toDateString() === today.toDateString();
  },
  isTomorrow: (input) => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (new Date(input)).toDateString() === tomorrow.toDateString();
  }
};

export default dateHelpers;
