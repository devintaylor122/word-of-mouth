import "./App.css";
import { db } from "./firebaseconfig.js";

function App() {
  console.log(db);
  return <div className="App">Hello</div>;
}

export default App;
