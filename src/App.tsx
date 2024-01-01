import "./App.css";
import Navbar from "./components/common/Navbar/Navbar";
import Profile from "./components/common/Profile/Profile";

function App() {
  return (
    <>
      <div className="dark-purple-morphism">
        <Navbar />
        <div className="">
          <Profile />
        </div>
      </div>
    </>
  );
}

export default App;
