// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let userData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(data => data.json())
  .then(data => userData = data);

let roomsData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(data => data.json())
  .then(data => roomsData = data);

let bookingData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(data => data.json())
  .then(data => bookingData = data);

let roomServiceData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(data => data.json())
  .then(data => roomServiceData = data);

$(document).ready(() => {

});

console.log('This is the JavaScript entry file - your code begins here.');
