import './App.css'
import Game from './atividade'



function App() {
  return (
    <div className="App">
      <header className="App-header text-center">
        <h1 className='mt-2'>Jogo da velha</h1>
        <h2 className='mt-5'>
        <Game/>
        </h2>
      </header>
    </div>
  );
}

export default App
