export const formatCitySlug = (citySlug) => {
  if (citySlug.slice(citySlug.lastIndexOf('-'), citySlug.length).length === 3) {
    const city = citySlug.replace('-', ' ').slice(0, citySlug.length - 3)
    const state = citySlug.slice(citySlug.lastIndexOf('-') + 1, citySlug.length)
    return `${city}, ${state}`
  }
  return citySlug.replace('-', ' ')
}
