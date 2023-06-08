import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <ItemListContainer greeting="Welcome" />
    </>
  );
}

export default App;
