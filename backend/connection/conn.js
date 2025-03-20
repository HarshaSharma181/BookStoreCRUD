const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://harsha77:harsha123@cluster0.yg5yn.mongodb.net/crudop?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("Connected"));