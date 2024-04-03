## In progress
### Shopping and tracker orders project
Objective: Make a shopping products store and tracking orders, with hexagonal architecture in the backend.   

### Tech Stack
Backend: Node | Express (TypeScript)   
Frontend: React (TypeScript)   
Database: MongoDB with Mongoose as ODM

### Pending
Pending frontend: Most of the frontend   

### Installation
#### Run the following commands after cloning the repository:
cd backend   
npm i   
npm run dev


### External API
https://openweathermap.org/api This API is used to get the city weather when doing the order. If it's raining it will add a suplement of 2€ to the order.   
https://resend.com/ This API is used to send email when creating and order, and when changing the status of the order i.e: From Accepted to Delivered. (Pending to verify email, 72h needed)

### .ENV Backend File needs:
#### PORT
#### DB_URL
#### WEATHER_API_KEY
#### RESSEND_EMAIL
#### JWT_SECRET
#### JWT_EXPIRES
