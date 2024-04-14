# Hodlinfo Clone

This project is a clone of hodlinfo.com, built using HTML/CSS for the frontend and Node.js/Express for the backend. The backend fetches data from the WazirX API, stores it in a MongoDb database, and serves it to the frontend through an API endpoint.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. open terminal in vs code and move to QuadbTech_Nodejs_Assignment folder
   ```bash
   cd QuadbTech_Nodejs_Assignment
3. run
   ```bash
   npm start

To Run Backend In local Server
1. Backend : [localhost:3000/api/dbtickers](localhost:3000/api/dbtickers)
1. Backend : [localhost:3000/api/dbtickers](localhost:3000/api/top10tickers)

This Instruction are only to run Both frontend and BAckend In Local Server , to Run The Frontend or backend you can also use 
1. Frontend link : [https://quadb-tech-nodejs-assignment-frontend.vercel.app/](https://quadb-tech-nodejs-assignment-frontend.vercel.app/))
2. Backend link : [https://quadb-tech-nodejs-assignment-backend-sigma.vercel.app/api/top10tickers](https://quadb-tech-nodejs-assignment-backend-sigma.vercel.app/api/top10tickers)
3. Backend Link :[https://quadb-tech-nodejs-assignment-backend-sigma.vercel.app/api/dbtickers](https://quadb-tech-nodejs-assignment-backend-sigma.vercel.app/api/dbtickers)



### Functionality
1. Automatic Data Refresh:
The backend automatically fetches fresh data from the WazirX API every 30 seconds.
Upon each refresh, the top 10 cryptocurrency data (sorted by volume) is saved to the PostgreSQL database.
Fetching Data on Frontend:

2. The frontend can retrieve cryptocurrency data from the backend API.
It calculates the difference and savings for each cryptocurrency based on previous data.
