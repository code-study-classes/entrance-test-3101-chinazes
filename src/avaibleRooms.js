import { state, elements } from "./storage.js";

export const checkHotels = () => {
  const hotelNames = Object.keys(state.hotels);
  hotelNames.forEach((hotelName) => {
    const option = document.createElement('option');
    option.dataset.identificator = hotelName;
    option.value = hotelName;
    option.textContent = hotelName;
    if (!document.querySelector(`[data-identificator="${hotelName}"]`)) {
      elements.checkHotelName.appendChild(option);
    }
  });
};

export default () => {
  elements.avaibleRoomsForm.addEventListener('input', (e) => {
    const formData = new FormData(elements.avaibleRoomsForm);
    const input = e.target.name;
    const value = formData.get(input).trim();
    state.hotelNameToCheck = value;
  });
  
  const addAvaibleRoomsToUlList = (list) => {
    elements.avaibleRooms.innerHTML = '';
    
    list.forEach((room) => {
      const liEl = document.createElement('li');
      liEl.textContent = room;
      elements.avaibleRooms.append(liEl);
    });
  };
  
  elements.avaibleRoomsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (state.hotelNameToCheck === '') {
      state.hotelNameToCheck = elements.checkHotelName.value;
    }

    const filteredRooms = Object.entries(state.rooms)
      .filter(([, value]) => value.hotelSelect === state.hotelNameToCheck && value.status === 'Свободен')
      .map(([key]) => key);
    
    console.log(filteredRooms)
    addAvaibleRoomsToUlList(filteredRooms);
  });
};
