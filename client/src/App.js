import './App.css';

import { useSelector } from 'react-redux'

function App() {
  const stats = useSelector(state => state.stats);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{stats.currentPower} kW</h1>
      </header>
    </div>
  );
}

export default App;
