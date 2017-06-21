export const formatCitySlug = (citySlug) => {
  if (citySlug.slice(citySlug.lastIndexOf('-'), citySlug.length).length === 3) {
    const city = citySlug.replace('-', ' ').slice(0, citySlug.length - 3)
    const state = citySlug.slice(citySlug.lastIndexOf('-') + 1, citySlug.length)
    return `${city}, ${state}`
  }
  return citySlug.replace('-', ' ')
}

export const fbPageFields = [
  'about', 'app_links', 'best_page', 'can_checkin', 'category',
  'category_list', 'contact_address', 'cover', 'description',
  'display_subtext', 'emails', 'fan_count', 'featured_video',
  'founded', 'general_info', 'id', 'impressum', 'is_community_page',
  'is_verified', 'link', 'location', 'name', 'overall_star_rating',
  'parent_page', 'phone', 'rating_count', 'start_info',
  'supports_instant_articles', 'talking_about_count',
  'website', 'were_here_count'
]
