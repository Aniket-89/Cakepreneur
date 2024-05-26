import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://aniketkumarg99:gDSlKZHyZgUVjGCW@cluster0.dgxyfnu.mongodb.net/cakepreneur').then(()=>console.log("DB Connected"))
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.