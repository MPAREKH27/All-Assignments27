import TrendingSongs from "./TrendingSongs";
import IPLScores from "./IPLScores";
import Example from "./Example";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <TrendingSongs />

      <hr />

      <IPLScores />

      <hr />

      <Example />
    </div>
  );
}

export default App;