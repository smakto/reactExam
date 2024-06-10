import { useEffect, useState } from "react";

export function useData(url) {
  const [dataSet, setNewDataset] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function retrieveData() {
      const response = await fetch(`http://localhost:3000/${url}`);
      const result = await response.json();
      setNewDataset(result);
      setLoaded(true);
    }
    retrieveData();
  }, [url]);

  function addData(newData) {
    fetch(`http://localhost:3000/${url}`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return { dataSet, loaded, addData };
}
