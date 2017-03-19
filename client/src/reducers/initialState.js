const initialState = {
  selectedLocation: {
    text: '',
    coords: null,
    errorMessage: null
  },
  venues: {
    isFetching: false,
    data: [],
    errorMessage: null
  },
  map: {
    center: [-74, 40.7],
    zoom: [11.5],
    errorMessage: null
  }
}

export default initialState
