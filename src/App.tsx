import "./App.css";
import Navbar from "./components/common/Navbar/Navbar";
import Profile from "./components/common/Profile/Profile";

function App() {
  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="h-96">
        <Navbar />
      </div>
      <div className="container">
        <Profile />
      </div>
    </>
  );
}

export default App;
