## Resto-Service
### Web Application for a Restaurant

This application is developed for the restaurant [Tochka](https://vk.com/tochkaobninsk). It includes functionality for table reservations, pre-order payment via Stripe, adding dishes, staff, and customers through the admin panel, user registration, shopping cart, and user notifications via email and SMS.

#### Client Side:
![](/ReadMe/main-client.png)


- Reserving a specific table for a desired date
  
![](/ReadMe/reservation-client.png)


- Viewing the menu with item descriptions
  
![](/ReadMe/menu-client.png)


- Adding items to the cart (available only to authorized users)
- Placing a pre-order or delivery
- Paying for the pre-order using the Stripe payment system

#### Admin Panel:
  Requirements - minimalist interface for POS terminals

![](/ReadMe/main-admin.png)


- Adding, modifying, and deleting categories, subcategories, and dishes
  
![](/ReadMe/add-admin.png)


- Viewing current orders and table reservations, confirming or deleting them
- Sending SMS and email notifications after order or reservation confirmation
- Editing client information, adding discounts, etc.
- Adding, deleting, and modifying staff members

## Technology Stack:
JavaScript

**DB**: PostgreSQL, Sequelize ORM

**Back**: Node.js, Express, Sessions, Bcrypt, Cors, Stripe

**Front**: React + Redux, Redux Saga, SVG, HTML5, SCSS/CSS, UI Kit

### Installation:
There are 2 folders in the directory:
* **server/** - responsible for the back-end.
   * cd server
   * npm ci
   * npx sequelize db:create
   * npx sequelize db:migrate
   * npx sequelize db:seed:all
   * npm run dev
* **client/** - front-end.
   * cd client 
   * npm ci
   * npm start
