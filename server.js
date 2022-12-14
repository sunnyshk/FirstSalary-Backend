const app = require("./index");

const connect = require("./src/configs/db");

const port = process.env.PORT||3000

app.listen(3000, async () => {
  try {
    await connect();
    console.log("Listening on port 3000");
  } catch (error) {
    console.log(error);
  }
});
