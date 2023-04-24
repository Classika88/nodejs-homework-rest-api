const mongoose = require('mongoose');
const app = require('./app')

const DB_HOST = 'mongodb+srv://Iryna:L4Nzow8CMMxKwc8u@cluster0.khhgkmf.mongodb.net/db-contacts?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST) 
.then(() => {
  app.listen(3000)
  console.log("Database connection successful")
})
.catch(err => {
  console.log(error.message);
  process.exit(1);
});
