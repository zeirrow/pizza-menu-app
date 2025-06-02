import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

// Load user from sessionStorage if available, otherwise use an empty state
const loadUser = () => {
  const storedUser = sessionStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : { username: '' };
};

// const initialState = loadUser(); // Load saved user
const initialState = {
  ...loadUser(), // Loads user from sessionStorage
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      sessionStorage.setItem('user', JSON.stringify(state)); // Save user
    },
    clearUser(state) {
      state.username = '';
      sessionStorage.removeItem('user'); // Remove user from sessionStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'error';
        state.error = ' Error fetching address, please fill it manually';
      });
  },
});

export const { updateName, clearUser } = userSlice.actions;
export default userSlice.reducer;
export const getUser = (store) => store.user.username;
