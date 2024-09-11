import { regions } from '../regions.js';
import { elements, state } from './storage.js';
import addRoom, { checkHotelNames } from './rooms.js';
import { checkHotels } from './avaibleRooms.js';
export default () => {
  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    elements.regionSelect.appendChild(option);
  });
  
  elements.hotelForm.addEventListener('input', (e) => {
    const formData = new FormData(elements.hotelForm);
    const input = e.target.name;
    const value = formData.get(input).trim();

    if (input === 'hotelName') {
      state.hotels[value] = { region: '' };
    }
    else {
      const stateWithoutRegion = (Object.entries(state.hotels).find(([, value]) => value.region === ''));
      const actualHotelName = stateWithoutRegion[0];
      state.hotels[actualHotelName].region = value;
    }
  });
  
  elements.hotelForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // localStorage.setItem(hotelState.hotelName, JSON.stringify(hotelState));
    elements.hotelName.value = '';
    const stateWithoutRegion = (Object.entries(state.hotels).find(([, value]) => value.region === ''));
    if (stateWithoutRegion) {
      const actualHotelName = stateWithoutRegion[0];
      state.hotels[actualHotelName].region = elements.regionSelect.value;
    }

    checkHotelNames();
    checkHotels();

    console.log(state.hotels)
  });
};
