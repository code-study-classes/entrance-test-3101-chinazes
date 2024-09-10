// import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';
import { regions } from '../regions.js';

const elements = {
  regionSelect: document.getElementById('regionSelect'),
  hotelButton: document.getElementById('addHotel'),
  hotelForm: document.querySelector('.hotel-form'),
  hotelName: document.getElementById('hotelName'),
  roomForm: document.querySelector('.room-form'),
  hotelSelect: document.getElementById('hotelSelect'),
  roomCategory: document.getElementById('roomCategory'),
  numberOfSeats: document.getElementById('numberOfSeats'),
  status: document.getElementById('status'),
  roomNumber: document.getElementById('roomNumber'),
  avaibleRoomsForm: document.querySelector('.avaibleRoomsForm'),
  avaibleRooms: document.getElementById('avaible'),
};

const hotelState = {
  hotelName: '',
  region: '',
  roomNumber: '',
  category: '',
  numberOfSeats: '',
  status: 'Свободен',
}
     
regions.forEach(region => {
  const option = document.createElement('option');
  option.value = region;
  option.textContent = region;
  elements.regionSelect.appendChild(option);
});

// const hotelSchema = yup.object().shape({
//   hotelName: yup
//     .string()
//     .max(150, 'Название отеля не должно превышать 150 символов')
//     .required('Название отеля обязательно'),
  
//   roomNumber: yup
//     .string()
//     .max(10, 'Номер не должен превышать 10 символов')
//     .required('Номер обязателен'),
  
//   category: yup
//     .string()
//     .oneOf(['Стандарт', 'Люкс', 'Апартаменты'], 'Неверная категория')
//     .required('Категория обязательна'),
// });

elements.hotelForm.addEventListener('input', (e) => {
  const formData = new FormData(elements.hotelForm);
  const input = e.target.name;
  const value = formData.get(input).trim();
  hotelState[input] = value;
});

const hotelNames = new Set();

elements.hotelForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (hotelState.region === '') {
    hotelState.region = elements.regionSelect.value;
  }
  localStorage.setItem(hotelState.hotelName, JSON.stringify(hotelState));
  elements.hotelName.value = '';

  hotelNames.add(hotelState.hotelName);

  console.log(JSON.parse(localStorage.getItem(hotelState.hotelName)));

});

const updateNumberOfSeats = () => {
  if (hotelState.category === 'Апартаменты') {
    const values = ['3', '4'];
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      option.dataset.id = value;
      elements.numberOfSeats.appendChild(option);
    });
  } 
  // else if (hotelState.numberOfSeats === '3' || hotelState.numberOfSeats === '4') {
  //   const values = ['3', '4'];
  //   values.forEach(value => elements.numberOfSeats.removeChild(document.querySelector(`[data-id="${value}"]`)));
  // }
};

const updadeStatus = () => {
  if (hotelState.status !== 'Свободен') {
    elements.status.classList.remove('avaible');
    elements.status.classList.add('notAvaible');
    elements.status.value = 'Занят';
  } else {
    elements.status.classList.add('avaible');
    elements.status.classList.remove('notAvaible');
    elements.status.value = 'Свободен';
  }
};

elements.roomForm.addEventListener('input', (e) => {
  const formData = new FormData(elements.roomForm);
  const input = e.target.name;
  const value = formData.get(input).trim();
  hotelState[input] = value;
  updateNumberOfSeats();
  updadeStatus();
});

elements.roomForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (hotelState.category === '') {
    hotelState.category = elements.roomCategory.value;
  }
  if (hotelState.numberOfSeats === '') {
    hotelState.numberOfSeats = elements.numberOfSeats.value;
  }
  if (hotelState.status === 'Свободен') {
    elements.status.value = 'Свободен';
  }
  
  const thisHotel = JSON.parse(localStorage.getItem(hotelState.hotelName));
  const updatedHotelData = Object.assign(thisHotel, hotelState);
  localStorage.setItem(hotelState.roomNumber, JSON.stringify(updatedHotelData));

  elements.hotelSelect.value = '';
  elements.roomNumber.value = '';

  console.log(JSON.parse(localStorage.getItem(hotelState.roomNumber)));
  Object.keys(hotelState).forEach(key => delete hotelState[key]);
});

let hotelNameToCheck = '';
elements.avaibleRoomsForm.addEventListener('input', (e) => {
  const formData = new FormData(elements.avaibleRoomsForm);
  const input = e.target.name;
  const value = formData.get(input).trim();
  hotelNameToCheck = value;
});

const addAvaibleRoomsToUlList = (list) => {
  elements.avaibleRooms.innerHTML = '';

  const numberOfAvaibleRooms = list
    .filter(({ status }) => status === 'Свободен')
    .map(({ roomNumber }) => roomNumber)
    .filter((number) => number !== '');
  
  numberOfAvaibleRooms.forEach((number) => {
    const liEl = document.createElement('li');
    liEl.textContent = number;
    elements.avaibleRooms.append(liEl);
  });
};

elements.avaibleRoomsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const hotelsData = {};
  const length = localStorage.length;
  for (let i = 0; i < length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    hotelsData[key] = value;
  }

  const dataForOneHotel = Object.entries(hotelsData).reduce((acc, entrie) => {
    const [key, value] = entrie;
    if (JSON.parse(value).hotelName === hotelNameToCheck) {
      acc.push(JSON.parse(value));
    }
    return acc;
  }, []);

  addAvaibleRoomsToUlList(dataForOneHotel);
});
