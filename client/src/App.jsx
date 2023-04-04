import "./App.css";
import HeaderNav from "./components/navBar";
import Pages from "./components/pages/pages";
import Footer from "./components/footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
        <HeaderNav />
        <Pages />
        <Footer />
    </div>
  );
}

export default App;
