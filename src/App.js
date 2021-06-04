import './App.css';
import Fetcher from './fetchData'
// import ReactDOM from 'react-dom';
function App() {
  return (
    <div className="App">
      <div id='data'>
        <Fetcher/>
      </div>
    </div>
  );
}

export default App;
