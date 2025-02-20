# LocalLance Backend  

This repository contains the backend for the LocalLance platform, built using [NestJS](https://nestjs.com/). It provides APIs for connecting freelancers in Rwanda's digital and creative sectors with local businesses and individuals.  

---

## Prerequisites  
Make sure you have the following installed on your system:  
- **Node.js** (v16 or higher recommended): [Download Node.js](https://nodejs.org)  
- **npm** (v7 or higher recommended): Comes bundled with Node.js  
- **Postman** (optional): For API testing  


## Installation  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/yourusername/LocalLance-backend.git
   ```
2. **Navigate to the Project Directory**

```bash
cd LocalLance-backend
```
3. Install Dependencies

```bash
npm install
```
## Environment Variables

This project uses environment variables to configure the application.

1. **Create a `.env` File**
In the root of the project, create a .env file.

2. **Add the Required Variables**

```bash
MONGO_URI= mongodb+srv://localLanceUser:UH26biWVEXs1imot@cluster0.agypm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET= <J9ijb>Y9Z9k
```

## Running the Project

1. Start the Development Server

```bash
npm run start:dev
```
This will start the application in development mode.

2. API Base URL
The API will be available at:

```bash
http://localhost:3000
```  
