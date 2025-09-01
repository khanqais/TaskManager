const express = require('express');
const dotenv = require('dotenv');
const route = require('./Restapi/task');
const cors=require('cors')
const connectDB = require('./DB/connect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use('/api', route);
//Hiii

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
