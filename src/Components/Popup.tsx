import "../Styles/Popup.css";

function Popup(props: any) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={()=> props.setTrigger(false)}>X</button>
        {props.children}
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