import "./App.css";
import Home from "./Pages/Home/Home";
import Cursor from "./Components/Common/Cursor/Cursor";
import CursorGlow from "./Components/Common/CursorGlow/CursorGlow";
import CurtainRaiser from "./Components/CurtainRaiser/CurtainRaiser";

function App() {
  return (
    <>
      <Cursor />
      <CursorGlow />
      <CurtainRaiser />
      <Home />
    </>
  );
}

export default App;
