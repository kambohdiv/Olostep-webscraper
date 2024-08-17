import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pakhtar635:uQAmi1FCRUrY7VgL@webscraper.cgksosi.mongodb.net/webScraper",
      {}
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
