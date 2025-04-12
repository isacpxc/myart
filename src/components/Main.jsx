import "./main.css"

function Main(props) {
  return (
    <main className="main-content" style={props.specialStyle}>
      {props.page}
    </main>
  );
}

export default Main;