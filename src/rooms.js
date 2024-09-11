import { state, elements } from "./storage.js";

export const checkHotelNames = () => {
  const hotelNames = Object.keys(state.hotels);
  hotelNames.forEach((hotelName) => {
    const option = document.createElement('option');
    option.dataset.id = hotelName;
    option.value = hotelName;
    option.textContent = hotelName;
    if (!document.querySelector(`[data-id="${hotelName}"]`)) {
      elements.hotelSelect.appendChild(option);
    }
  });
};

export default () => {
  const updateNumberOfSeats = (currentlyProcessedRoomState) => {
    if (currentlyProcessedRoomState.category === 'Апартаменты') {
      const values = ['3', '4'];
      values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        option.dataset.id = value;
        if (!document.querySelector(`[data-id="${value}"]`)) {
          elements.numberOfSeats.appendChild(option);
        }
      });
    } 
    else if (currentlyProcessedRoomState.numberOfSeats === '3' || currentlyProcessedRoomState.numberOfSeats === '4') {
      const values = ['3', '4'];
      values.forEach(value => {
        const option = document.querySelector(`[data-id="${value}"]`);
        console.log(option);
        option.remove();
      });
    }
  };
  
  const updadeStatus = (currentlyProcessedRoomState) => {
    if (currentlyProcessedRoomState.status === 'Занят') {
      elements.status.classList.remove('avaible');
      elements.status.classList.add('notAvaible');
    } else {
      elements.status.classList.add('avaible');
      elements.status.classList.remove('notAvaible');
    }
  };
  
  elements.roomForm.addEventListener('input', (e) => {
    if (!Object.keys(state.hotels).length) {
      alert('Сначала добавьте отель!')
    }
    const formData = new FormData(elements.roomForm);
    const input = e.target.name;
    const value = formData.get(input).trim();
    
    if (input === 'roomNumber') {
      state.rooms[value] = {
        'hotelSelect': '',
        'category': '',
        'numberOfSeats': '',
        'status': '',
      };

      state.currentRoom = value;
    } else {
      const addedRooms = Object.entries(state.rooms);
      if (!addedRooms.length) {
        alert('Сначала укажите номер!')
      }

      const currentlyProcessedRoomState =  Object.entries(state.rooms).find(([key]) => key === state.currentRoom)[1];
      currentlyProcessedRoomState[input] = value;
      state.rooms[state.currentRoom] = currentlyProcessedRoomState;

      updateNumberOfSeats(currentlyProcessedRoomState);
      updadeStatus(currentlyProcessedRoomState);
    }
  });
  
  elements.roomForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentlyProcessedRoomState =  Object.entries(state.rooms).find(([key]) => key === state.currentRoom)[1];

    if (currentlyProcessedRoomState.category === '') {
      currentlyProcessedRoomState.category = elements.category.value;
    }
    if (currentlyProcessedRoomState.numberOfSeats === '') {
      currentlyProcessedRoomState.numberOfSeats = elements.numberOfSeats.value;
    }
    if (currentlyProcessedRoomState.hotelSelect === '') {
      currentlyProcessedRoomState.hotelSelect = elements.hotelSelect.value;
    }
    if (currentlyProcessedRoomState.status === '') {
      currentlyProcessedRoomState.status = 'Свободен';
    }
  
    elements.hotelSelect.value = '';
    elements.roomNumber.value = '';
    
    console.log(state)
  });
};
