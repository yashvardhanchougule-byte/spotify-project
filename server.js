const app= require("./src/app.js");
const dbconnect= require("./src/db/db.js");
require("dotenv").config();

app.listen(3000, async () => {
    await dbconnect();
    console.log("Server is running on port 3000");
});