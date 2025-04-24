import Sidebar from "./components/Sidebar.jsx"
import Main from "./components/Main.jsx"

function App() {

  const HomePage = () => {
    return (
      <>
        <span>Search Collection by Address</span>
        <br />
        <input type="text" /><button>search</button>
        <div className="hold-nft-boxes">
          {/* <div className="nft-box"></div> */}
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <Main page={<HomePage />} />
    </>
  )
}

export default App
