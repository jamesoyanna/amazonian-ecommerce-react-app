import express from "express";
import path from "path";
const __dirname = path.resolve();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config.js";

// import userRoute from "./routes/userRoute.js";
// import productRoute from "./routes/productRoute.js";
// import orderRoute from "./routes/orderRoute.js";
// import uploadRoute from "./routes/uploadRoute.js";

// mOngo DbB connection
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
})
.catch((error) => console.log(error.reason));

const app = express();
 //Use middleware
app.use(bodyParser.json());

// app.use("api/uploads", uploadRoute);
app.get("/", (req, res)=>{
    res.send("I am eating egusi  an d draw biko");
    res.end();
})

// app.use("/api/uploads", uploadRoute);
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
// app.get("/api/config/paypal", (req, res) => {
//   res.send(config.PAYPAL_CLIENT_ID);
// });

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, ()=>
console.log("Server running on port 5000"));