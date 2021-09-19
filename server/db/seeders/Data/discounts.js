const discounts = [
  {
    size: 0,
    min_limit: 0,
    max_limit: 5000,
    is_personal: false,
    name: 'New one',
    description: 'For guests',
    createdAt: new Date(),
  },
  {
    size: 5,
    min_limit: 5001,
    max_limit: 15000,
    is_personal: false,
    name: 'Hello, boy',
    description: 'For those who knows',
    createdAt: new Date(),
  },
  {
    size: 10,
    min_limit: 15001,
    max_limit: 25000,
    is_personal: false,
    name: 'You touch my talala',
    description: 'For those who can',
    createdAt: new Date(),
  },
  {
    size: 15,
    min_limit: 25001,
    max_limit: 35000,
    is_personal: false,
    name: 'Come on, please help me Dr. Deeck',
    description: 'Oh my!',
    createdAt: new Date(),
  },
  {
    size: 30,
    min_limit: 0,
    max_limit: 0,
    is_personal: true,
    name: 'Shut up and drive',
    description: 'Damn, boy',
    createdAt: new Date(),
  },
];

module.exports = discounts;
