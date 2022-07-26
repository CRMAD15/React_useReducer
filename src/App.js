import './App.css';
import { Counter } from './components/Counter';
import LoginUseState from './components/LoginUseState';
import LoginUseReducer from './components/LoginUseReducer';
import {TodoList} from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>useReducer Examples</h1>
        {/* <Counter></Counter> */}
        {/* <LoginUseState></LoginUseState> */}
        {/* <LoginUseReducer></LoginUseReducer> */}
        <TodoList></TodoList>
      </header>
    </div>
  );
}

export default App;
