import { Request, Response } from "express";
import capitalsService from "../services/capitalsService";

class CapitalsController {
  getCapitals = async (req: Request, res: Response): Promise<Response> => {
    try {
      const capitals = await capitalsService.getCapitals();
      return res.json(capitals);
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  };
}

export default new CapitalsController();
