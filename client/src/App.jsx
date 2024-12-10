import {Navbar, Welcome} from "./components/index"

function App() {

  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="gradient-bg-welcome overflow-hidden"> 
          <Navbar/>
          <Welcome/>
      </div>
    </div>
  )
}

export default App
