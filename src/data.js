import fetch from "cross-fetch";

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(data => data.json())
  .then(data => userData = data.users)
  .catch((err) => err);

let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(data => data.json())
  .then(data => roomsData = data.rooms)
  .catch((err) => err);

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(data => data.json())
  .then(data => bookingData = data.bookings)
  .catch((err) => err);

let roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(data => data.json())
  .then(data => roomServiceData = data.roomServices)
  .catch((err) => err);

let netData = {
  'userData': {},
  'roomsData': {},
  'bookingData': {},
  'roomServiceData': {}
};

Promise.all([userData, roomsData, bookingData, roomServiceData])
  .then(function(fetchData) {
    netData['userData'] = fetchData[0];
    netData['roomsData'] = fetchData[1];
    netData['bookingData'] = fetchData[2];
    netData['roomServiceData'] = fetchData[3];
    return netData;
  });

export default netData;