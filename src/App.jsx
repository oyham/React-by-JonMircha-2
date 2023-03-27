import './App.css'
import ConceptosBasicos from './components/ConceptosBasicos'
import CrudApi from './components/CrudApi'
import SongSearch from './components/SongSearch'

function App() {

  return (
    <div className="App">
      <h1>React Router</h1>
      <a href='https://reactrouter.com/en/6.8.2/start/tutorial' target='_blank'>Start Tutorial</a>
      <SongSearch />
      <hr />
      <CrudApi />
      <hr />
      <ConceptosBasicos />
    </div>
  )
}

export default App
