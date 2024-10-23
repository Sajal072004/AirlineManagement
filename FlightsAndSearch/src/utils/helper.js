function compareTime(ts1 , ts2){
  let dateTime1 = new Date(ts1);
  let dateTime2 = new Date(ts2);

  return dateTime1.getTime() > dateTime2.getTime();
}

module.exports = {
  compareTime
}