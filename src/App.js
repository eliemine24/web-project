import { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  async function fetchTrack() {
    const response = await fetch(
      "https://www.theaudiodb.com/api/v1/json/123/search.php?s=System+of+a+down"
    );

    const result = await response.json();

    // stockage du JSON dans le state
    setData(result);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Recherche de titre</h1>

      <button onClick={fetchTrack}>
        Requête API
      </button>

      {data && (
        <>
          <h2>Résultat JSON</h2>

          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;