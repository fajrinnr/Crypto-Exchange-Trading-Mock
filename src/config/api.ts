import axios from "axios";

export default (() => {
  const api = axios.create({ baseURL: "https://api1.binance.com" });

  return api;
})();
