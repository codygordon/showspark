const initialState = {
  selectedLocation: {
    text: '',
    coords: null
  },
  venues: {
    isFetching: false,
    data: []
  },
  map: {
    center: [-74, 40.7],
    zoom: [11.5]
  }
}

export default initialState
