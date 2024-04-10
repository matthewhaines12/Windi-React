import "../Styles/Popup.css";

function Popup(props: any) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h2>No Location Permission!</h2>
        <br/>
        <p>Enable location!</p>
      </div>
    </div>
  ) : "";
}

export default Popup

/*
  <div className="popup-inner">
    <button className="close-btn" onClick={()=> props.setTrigger(false)}>X</button>
    {props.children}
  </div>
 */