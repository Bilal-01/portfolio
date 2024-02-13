import "./App.css";
import Navbar from "./components/core/Navbar/Navbar";
import Experience from "./components/Experience/Experience";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <div className="area bg-dark">
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
      <div className="container">
        <div className="mb-[96px]">
          <Navbar />
        </div>
        <section id="profile" className="section">
          <div>
            <Profile />
          </div>
        </section>
        <section id="experience" className="section">
          <div>
            <Experience />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
