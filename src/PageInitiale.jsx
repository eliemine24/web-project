export function PageInitiale({onStart}){
  return(
    <div className="Container">
    <ButtonStart onClick={onStart}/>
    </div>
    )
}

function ButtonStart({onClick}){
  return(
    <button 
      className="Bouton-Start"
      style={{bottom: '50%'}} 
      onClick={onClick}
    >
      START!
    </button>)
}