const venueSearchInitState = {
  selectedLocation: {
    text: '',
    coords: null,
    errorMessage: null
  },
  venues: {
    isFetching: false,
    data: [],
    perPage: 16,
    pageCount: 0,
    currentPage: 1,
    total: 0,
    errorMessage: null,
    hoveredId: null
  },
  map: {
    center: [-74, 40.7],
    zoom: [11.5],
    errorMessage: null
  }
}

export default venueSearchInitState
