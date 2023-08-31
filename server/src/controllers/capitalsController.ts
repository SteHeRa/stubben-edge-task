import { Request, Response } from "express";
import capitalsService from "../services/capitalsService";

class CapitalsController {
  getCapitals = async (req: Request, res: Response): Promise<Response> => {
    const capitals = await capitalsService.getCapitals();
    return res.json(capitals);
  };
}

export default new CapitalsController();
