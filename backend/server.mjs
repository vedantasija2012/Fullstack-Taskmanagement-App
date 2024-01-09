import app from "./app.js";
import connectDB from "./config/connectDB.js";

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`App listening at: http://localhost:${process.env.PORT}`)
})