import axios from "axios";

interface CapitalsResponse {
  error: boolean;
  msg: string;
  data: Capital[];
}

interface Capital {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
}

class CapitalsService {
  getCapitals = async (): Promise<CapitalsResponse> => {
    const { data } = await axios.get<CapitalsResponse>(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );

    return data;
  };
}

export default new CapitalsService();
