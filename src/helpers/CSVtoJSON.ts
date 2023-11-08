interface CSVToJSONProps {
  (data: string, delimiter: string): {
    currency_code?: string;
    currency_name?: string;
  }[];
}
const CSVtoJSON: CSVToJSONProps = (data, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj: any, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};

export default CSVtoJSON;
