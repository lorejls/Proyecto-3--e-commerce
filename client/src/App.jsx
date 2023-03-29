import './App.css';
import Login from './components/login'
import RegisterSeller from './components/registerSeller'
import RegisterCustomer from './components/registerCustomer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <Login></Login>
    <RegisterSeller/>
    <RegisterCustomer/>
    </div>
  );
}

export default App;
