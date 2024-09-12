/* eslint-disable no-undef */
export const elements = {
  regionSelect: document.getElementById('regionSelect'),
  hotelButton: document.getElementById('addHotel'),
  hotelForm: document.querySelector('.hotel-form'),
  hotelName: document.getElementById('hotelName'),
  roomForm: document.querySelector('.room-form'),
  hotelSelect: document.getElementById('hotelSelect'),
  category: document.getElementById('category'),
  numberOfSeats: document.getElementById('numberOfSeats'),
  status: document.getElementById('status'),
  roomNumber: document.getElementById('roomNumber'),
  avaibleRoomsForm: document.querySelector('.avaibleRoomsForm'),
  avaibleRooms: document.getElementById('avaible'),
  checkHotelName: document.getElementById('checkHotelName'),
};

export const state = {
  hotels: {},
  rooms: {},
  currentRoom: '',
  currentHotelName: '',
  currentRegion: '',
  hotelNameToCheck: '',
};
