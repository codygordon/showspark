module.exports = function stateNameAbbrev(stateName) {
  const states = [
    { abbrev: 'AL', stateName: 'Alabama' },
    { abbrev: 'AK', stateName: 'Alaska' },
    { abbrev: 'AZ', stateName: 'Arizona' },
    { abbrev: 'AR', stateName: 'Arkansas' },
    { abbrev: 'CA', stateName: 'California' },
    { abbrev: 'CO', stateName: 'Colorado' },
    { abbrev: 'CT', stateName: 'Connecticut' },
    { abbrev: 'DE', stateName: 'Delaware' },
    { abbrev: 'DC', stateName: 'District Of Columbia' },
    { abbrev: 'FL', stateName: 'Florida' },
    { abbrev: 'GA', stateName: 'Georgia' },
    { abbrev: 'HI', stateName: 'Hawaii' },
    { abbrev: 'ID', stateName: 'Idaho' },
    { abbrev: 'IL', stateName: 'Illinois' },
    { abbrev: 'IN', stateName: 'Indiana' },
    { abbrev: 'IA', stateName: 'Iowa' },
    { abbrev: 'KS', stateName: 'Kansas' },
    { abbrev: 'KY', stateName: 'Kentucky' },
    { abbrev: 'LA', stateName: 'Louisiana' },
    { abbrev: 'ME', stateName: 'Maine' },
    { abbrev: 'MD', stateName: 'Maryland' },
    { abbrev: 'MA', stateName: 'Massachusetts' },
    { abbrev: 'MI', stateName: 'Michigan' },
    { abbrev: 'MN', stateName: 'Minnesota' },
    { abbrev: 'MS', stateName: 'Mississippi' },
    { abbrev: 'MO', stateName: 'Missouri' },
    { abbrev: 'MT', stateName: 'Montana' },
    { abbrev: 'NE', stateName: 'Nebraska' },
    { abbrev: 'NV', stateName: 'Nevada' },
    { abbrev: 'NH', stateName: 'New Hampshire' },
    { abbrev: 'NJ', stateName: 'New Jersey' },
    { abbrev: 'NM', stateName: 'New Mexico' },
    { abbrev: 'NY', stateName: 'New York' },
    { abbrev: 'NC', stateName: 'North Carolina' },
    { abbrev: 'ND', stateName: 'North Dakota' },
    { abbrev: 'OH', stateName: 'Ohio' },
    { abbrev: 'OK', stateName: 'Oklahoma' },
    { abbrev: 'OR', stateName: 'Oregon' },
    { abbrev: 'PA', stateName: 'Pennsylvania' },
    { abbrev: 'RI', stateName: 'Rhode Island' },
    { abbrev: 'SC', stateName: 'South Carolina' },
    { abbrev: 'SD', stateName: 'South Dakota' },
    { abbrev: 'TN', stateName: 'Tennessee' },
    { abbrev: 'TX', stateName: 'Texas' },
    { abbrev: 'UT', stateName: 'Utah' },
    { abbrev: 'VT', stateName: 'Vermont' },
    { abbrev: 'VA', stateName: 'Virginia' },
    { abbrev: 'WA', stateName: 'Washington' },
    { abbrev: 'WV', stateName: 'West Virginia' },
    { abbrev: 'WI', stateName: 'Wisconsin' },
    { abbrev: 'WY', stateName: 'Wyoming' },
  ]

  let stateAbbrev;

  states.forEach((state) => { // eslint-disable-line consistent-return
    if (stateName === state.stateName) stateAbbrev = state.abbrev
  })

  return stateAbbrev
}