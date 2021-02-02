const unixTimestamp = 1575909015;

const milliseconds = 1612289428000 - 21600000;

const dateObject = new Date(milliseconds);

const humanDateFormat = dateObject.toLocaleString();

console.log(humanDateFormat);
