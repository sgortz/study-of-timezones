let unix_timestamp = 1612204032;

let newDate = new Date(unix_timestamp * 1000);

let hours = date.getHours();

let minutes = "0" + date.getMinutes();

let formattedTime = hours + ":" + minutes.substr(-2);

console.log(formattedTime);
