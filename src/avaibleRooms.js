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
  
  const displayObjectContent = (obj, parent) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const element = document.createElement('div');
            
            if (typeof value === 'object' && value !== null) {
                const subElement = document.createElement('div');
                subElement.style.marginLeft = '20px';
                element.textContent = `${key}:`;
                displayObjectContent(value, subElement);
                element.appendChild(subElement);
            } else {
                element.textContent = `${key}: ${value}`;
            }

            parent.appendChild(element);
        }
    }
  };

  const addAvaibleRoomsToUlList = (list) => {
    elements.avaibleRooms.innerHTML = '';
    
    list.forEach((room) => {
      const roomState = state.rooms[room];
      
      const currentHotelState = (Object.entries(state.hotels).find(([key]) => key === state.currentHotelName));
      const region = currentHotelState[1].region;
      roomState.region = region;

      const liEl = document.createElement('li');
      const contentDiv = document.createElement('div');
      displayObjectContent(roomState, contentDiv);
      liEl.textContent = room;
      liEl.classList.add('avaibleListEl');
      liEl.append(contentDiv);
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
