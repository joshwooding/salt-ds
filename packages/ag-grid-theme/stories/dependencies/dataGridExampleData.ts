const dataGridExampleData = [
  {
    name: 'Alabama',
    code: 'AL',
    capital: 'Montgomery',
    rating: 10,
    population: 8446790
  },
  {
    name: 'Alaska',
    code: 'AK',
    capital: 'Juneau',
    rating: 20,
    population: 5492139
  },
  {
    name: 'Arizona',
    code: 'AZ',
    capital: 'Phoenix',
    rating: 30,
    population: 806007
  },
  {
    name: 'Arkansas',
    code: 'AR',
    capital: 'Little Rock',
    rating: 40,
    population: 59453
  },
  {
    name: 'California',
    code: 'CA',
    capital: 'Sacramento',
    rating: 10,
    population: 8319396
  },
  {
    name: 'Colorado',
    code: 'CO',
    capital: 'Denver',
    rating: 10,
    population: 8822592
  },
  {
    name: 'Connecticut',
    code: 'CT',
    capital: 'Hartford',
    rating: 10,
    population: 2465263
  },
  {
    name: 'Delaware',
    code: 'DE',
    capital: 'Dover',
    rating: 10,
    population: 3075357
  },
  {
    name: 'Florida',
    code: 'FL',
    capital: 'Tallahassee',
    rating: 10,
    population: 7597316
  },
  {
    name: 'Georgia',
    code: 'GA',
    capital: 'Atlanta',
    rating: 10,
    population: 7271180
  },
  {
    name: 'Hawaii',
    code: 'HI',
    capital: 'Honolulu',
    rating: 10,
    population: 8534120
  },
  {
    name: 'Idaho',
    code: 'ID',
    capital: 'Boise',
    rating: 10,
    population: 5806269
  },
  {
    name: 'Illinois',
    code: 'IL',
    capital: 'Springfield',
    rating: 10,
    population: 525951
  },
  {
    name: 'Indiana',
    code: 'IN',
    capital: 'Indianapolis',
    rating: 10,
    population: 5220228
  },
  {
    name: 'Iowa',
    code: 'IA',
    capital: 'Des Moines',
    rating: 10,
    population: 333600
  },
  {
    name: 'Kansas',
    code: 'KS',
    capital: 'Topeka',
    rating: 10,
    population: 170082
  },
  {
    name: 'Kentucky',
    code: 'KY',
    capital: 'Frankfort',
    rating: 10,
    population: 1359657
  },
  {
    name: 'Louisiana',
    code: 'LA',
    capital: 'Baton Rouge',
    rating: 10,
    population: 9267793
  },
  {
    name: 'Maine',
    code: 'ME',
    capital: 'Augusta',
    rating: 10,
    population: 7366792
  },
  {
    name: 'Maryland',
    code: 'MD',
    capital: 'Annapolis',
    rating: 10,
    population: 2474500
  },
  {
    name: 'Massachusetts',
    code: 'MA',
    capital: 'Boston',
    rating: 10,
    population: 7858200
  },
  {
    name: 'Michigan',
    code: 'MI',
    capital: 'Lansing',
    rating: 10,
    population: 4036589
  },
  {
    name: 'Minnesota',
    code: 'MN',
    capital: 'St. Paul',
    rating: 10,
    population: 490080
  },
  {
    name: 'Mississippi',
    code: 'MS',
    capital: 'Jackson',
    rating: 10,
    population: 2021576
  },
  {
    name: 'Missouri',
    code: 'MO',
    capital: 'Jefferson City',
    rating: 10,
    population: 3511147
  },
  {
    name: 'Montana',
    code: 'MT',
    capital: 'Helena',
    rating: 10,
    population: 2856628
  },
  {
    name: 'Nebraska',
    code: 'NE',
    capital: 'Lincoln',
    rating: 10,
    population: 9584904
  },
  {
    name: 'Nevada',
    code: 'NV',
    capital: 'Carson City',
    rating: 10,
    population: 489695
  },
  {
    name: 'New Hampshire',
    code: 'NH',
    capital: 'Concord',
    rating: 10,
    population: 8819049
  },
  {
    name: 'New Jersey',
    code: 'NJ',
    capital: 'Trenton',
    rating: 10,
    population: 2500770
  },
  {
    name: 'New Mexico',
    code: 'NM',
    capital: 'Santa Fe',
    rating: 10,
    population: 536205
  },
  {
    name: 'New York',
    code: 'NY',
    capital: 'Albany',
    rating: 10,
    population: 5248173
  },
  {
    name: 'North Carolina',
    code: 'NC',
    capital: 'Raleigh',
    rating: 10,
    population: 1452619
  },
  {
    name: 'North Dakota',
    code: 'ND',
    capital: 'Bismarck',
    rating: 10,
    population: 8890392
  },
  {
    name: 'Ohio',
    code: 'OH',
    capital: 'Columbus',
    rating: 10,
    population: 5968829
  },
  {
    name: 'Oklahoma',
    code: 'OK',
    capital: 'Oklahoma City',
    rating: 10,
    population: 9044655
  },
  {
    name: 'Oregon',
    code: 'OR',
    capital: 'Salem',
    rating: 10,
    population: 8054969
  },
  {
    name: 'Pennsylvania',
    code: 'PA',
    capital: 'Harrisburg',
    rating: 10,
    population: 1359410
  },
  {
    name: 'Rhode Island',
    code: 'RI',
    capital: 'Providence',
    rating: 10,
    population: 4473590
  },
  {
    name: 'South Carolina',
    code: 'SC',
    capital: 'Columbia',
    rating: 10,
    population: 6527907
  },
  {
    name: 'South Dakota',
    code: 'SD',
    capital: 'Pierre',
    rating: 10,
    population: 3152416
  },
  {
    name: 'Tennessee',
    code: 'TN',
    capital: 'Nashville',
    rating: 10,
    population: 9717114
  },
  {
    name: 'Texas',
    code: 'TX',
    capital: 'Austin',
    rating: 10,
    population: 6552290
  },
  {
    name: 'Utah',
    code: 'UT',
    capital: 'Salt Lake City',
    rating: 10,
    population: 2815416
  },
  {
    name: 'Vermont',
    code: 'VT',
    capital: 'Montpelier',
    rating: 10,
    population: 2845360
  },
  {
    name: 'Virginia',
    code: 'VA',
    capital: 'Richmond',
    rating: 10,
    population: 4919143
  },
  {
    name: 'Washington',
    code: 'WA',
    capital: 'Olympia',
    rating: 10,
    population: 4614717
  },
  {
    name: 'West Virginia',
    code: 'WV',
    capital: 'Charleston',
    rating: 10,
    population: 6413104
  },
  {
    name: 'Wisconsin',
    code: 'WI',
    capital: 'Madison',
    rating: 10,
    population: 3934168
  },
  {
    name: 'Wyoming',
    code: 'WY',
    capital: 'Cheyenne',
    rating: 10,
    population: 901078
  }
];

export default dataGridExampleData;
