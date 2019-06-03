// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/index.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import data from './data';
import Bookings from './Bookings';
import Orders from './Orders'
import RoomRepo from './RoomRepo';
import Customer from './Customer';
import CustomerRepo from "./CustomerRepo";


setTimeout(() => {
  $(document).ready(() => {
  
    $('ul.tabs li').click(function () {
      let tab_id = $(this).attr('data-tab');

      $('ul.tabs li').removeClass('selected');
      $('.content').removeClass('selected');

      $(this).addClass('selected');
      $("#" + tab_id).addClass('selected');
    });
    
    
    function todaysDate() {
      let date = new Date();
      if (date.getDay() < 10 && (date.getMonth() + 1) < 10) {
        return `0${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()}`;
      } else if (date.getDate() < 10) {
        return `0${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
      } else if ((date.getMonth() + 1) < 10) {
        return `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()}`;
      } else {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
      }
    }

    console.log(data.roomServiceData)

    let customer;
    let customerRepo = new CustomerRepo(data.userData);
    let bookings = new Bookings(data.bookingData, data.roomsData);
    let orders = new Orders(data.roomServiceData, data.roomsData, data.bookingData);
    let roomRepo = new RoomRepo(data.roomsData, data.bookingData);
    
    $('#todays-date').text(todaysDate());

    $('#rooms-available')
      .text(`There are ${bookings.getAvailableRooms(todaysDate()).length} rooms available today`);

    $('#todays-income')
      .text(`The hotel made $${orders.totalIncomeByDay(todaysDate())} today`);

    $('#rooms-occupied')
      .text(`${bookings.roomsOccupiedPercentage(todaysDate())} of rooms are occupied today`);

    $('#popular-booking-date')
      .text(`${bookings.getMostPopularDate(todaysDate())} is the most booked date`);
    
    $('#least-booked-date')
      .text(`${bookings.leastPopularDate(todaysDate())} is the least booked date`);

    $('#all-roomservice-today').append(orders.getOrdersByDate(todaysDate()));

    $('#table-available-rooms')
      .append(roomRepo.formatAvailableRooms(todaysDate()));

    $('#add-customer-button').on('click', function() {
      let nameInput = $('#add-customer-input');
      customer = new Customer(customerRepo.createCustomer(nameInput));
      console.log(customer);
    })

    // $('#customer-bookings').append(roomRepo.bookingForCustomer(customer.id))

  });  
}, 150);

console.log('This is the JavaScript entry file - your code begins here.');
