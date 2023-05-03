import express from "express";
import routesUser from "../route/users";
import routesPet from "../route/pets";
import { Pet } from "./pet";
import { User } from "./user";
import cors from "cors";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Puerto: " + this.port);
    });
  }

  routes() {
    this.app.use("/api/users", routesUser);
    this.app.use("/api/pets", routesPet);
  }

  midlewares() {
    //Parseo body
    this.app.use(express.json());

    //Cors
    this.app.use(cors());
  }
  

  async dbConnect() {
    try {
      await User.sync();
      await Pet.sync();
    } catch (error) {
      console.log("Unable to connect");
    }
  }
}

export default Server;
