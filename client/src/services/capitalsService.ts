import axios from "axios";

export interface CapitalsResponse {
  error: boolean;
  msg: string;
  data: Capital[];
}

export interface Capital {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
}

class CapitalsService {
  getCapitals = async (): Promise<CapitalsResponse> => {
    const { data } = await axios.get<CapitalsResponse>("capitals");
    return data;
  };
}

export default new CapitalsService();
