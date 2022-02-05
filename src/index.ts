import "reflect-metadata";
import { createConnection } from "typeorm";
import { typeRoutes } from "./routes/typeRoutes";
import express from "express";
import { bookListRoutes } from "./routes/bookListRoutes";
import { authorRouter } from "./routes/authorRoutes";

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());

app.use("/types", typeRoutes);
app.use("/books", bookListRoutes);
app.use("/authors", authorRouter);

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
createConnection()
  .then(async () => {
    app.listen(PORT, async () => {
      console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT  ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
