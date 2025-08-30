import { app } from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT;
    const runningMsg: string = `app listening on port ${PORT}`;
    app.listen(PORT, () => {
      console.log(runningMsg);
    });
  })
  .catch((error) => console.log(error));
