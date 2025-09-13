import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        const url =
          "https://docs.google.com/spreadsheets/d/1eUiLXYR69TgmIr9TYs0CPvVcsyukjtp3tVTVTrFdMKQ/export?format=csv&gid=0";

        const response = await fetch(url);
        const text = await response.text();

        console.log("Raw CSV:", text); // 🔍 check the CSV content

        const rows = text.trim().split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const jsonData = rows.slice(1).map((row) => {
          let obj = {};
          row.forEach((val, i) => {
            obj[headers[i]] = val;
          });
          return obj;
        });

        console.log("Parsed JSON:", jsonData); // 🔍 check parsed data
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching sheet:", err);
      }
    };

    fetchSheet();
  }, []);

  return (
    <div className="p-4">
      <h1>Google Sheet Data</h1>
      {data.length === 0 && <p>Loading or no data found...</p>}
      <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>
                  {val.startsWith("http") ? (
                    <img src={val} alt="img" width="50" />
                  ) : (
                    val
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
