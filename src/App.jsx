import Sidebar from "./components/Sidebar.jsx"
import Main from "./components/Main.jsx"
import HomePage from "./components/Home.jsx"

function App() {

  return (
    <>
      <Sidebar />
      <Main page={<HomePage />} />
    </>
  )
}

export default App
