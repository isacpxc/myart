import "./main.css"

function Main(props) {
  return (
    <>
      <main className="main-content" style={props.specialStyle}>
        {props.page}
      </main>
      <div id="backdrop"></div> 
      {/* backdrop div */}
    </>
  );
}

export default Main;