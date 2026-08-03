import './App.css'
import LikeButton from './components/LikeButton'
import SearchBar from './components/SearchBar'
import LoginForm from './components/LoginForm'
import PlaylistAdder from './components/PlaylistAdder'

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1>⚛️ React Session 5</h1>
        <p>State & Events — all 5 components</p>
      </div>

      <div className="components-grid">

        <div className="component-card">
          <h2>Component 1</h2>
          <h3>LikeButton</h3>
          <LikeButton />
        </div>

        <div className="component-card">
          <h2>Component 2</h2>
          <h3>SearchBar</h3>
          <SearchBar />
        </div>

        <div className="component-card">
          <h2>Component 3 &amp; 5</h2>
          <h3>LoginForm</h3>
          <LoginForm />
        </div>

        <div className="component-card">
          <h2>Component 4</h2>
          <h3>PlaylistAdder</h3>
          <PlaylistAdder />
        </div>

      </div>
    </div>
  )
}

export default App