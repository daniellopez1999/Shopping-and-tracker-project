## In progress
### Shopping and tracker orders project
Objective: Make a shopping products store and tracking orders, with hexagonal architecture in the backend.   

### Tech Stack
Backend: Node | Express (TypeScript)   
Frontend: React (TypeScript)
Database: MongoDB with Mongoose as ODM

### Pending
Pending frontend: Most of the frontend   
Pending backend: Auth and user roles/permissions   
superadmin | admin | customer | courier


### Installation
#### Run the following commands after cloning the repository:
cd backend   
npm i   
npm run dev



### External API
External API: https://openweathermap.org/api This API is used to get the city weather when doing the order. If it's raining it will add a suplement of 2€ to the order.   

### .ENV Backend File needs:
#### PORT
#### DB_URL
#### WEATHER_API_KEY
