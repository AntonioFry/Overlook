// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import data from './data';
import Bookings from './Bookings';

$(document).ready(() => {
  console.log(data.userData)

  let customer;
  let bookings = new Bookings(data.bookingData, data.roomsData);
  let orders;
  
  $('#rooms-available')
    .text(`there are ${bookings.getAvailableRooms("17/07/2019").length} available today`);

});

console.log('This is the JavaScript entry file - your code begins here.');
