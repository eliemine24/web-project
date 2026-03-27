import './View.css';

export function PageInitiale({onStart}){
  return(
 
    <div className="Container" color='#ffffff'>
        <div class="horizontal-scroll">
            <div class="horizontal-scroll-item item-1"></div>
            <div class="horizontal-scroll-item item-2"></div>
          <div class="horizontal-scroll-item item-3"></div>
          <div class="horizontal-scroll-item item-4"></div>
          <div class="horizontal-scroll-item item-5"></div>
          <div class="horizontal-scroll-item item-1"></div>
          <div class="horizontal-scroll-item item-2"></div>
          <div class="horizontal-scroll-item item-3"></div>
          <div class="horizontal-scroll-item item-4"></div>
          <div class="horizontal-scroll-item item-5"></div>		
        </div>
        <div class="Title">
          Munder
        </div>
        <div>
          <ButtonStart onClick={onStart}/>
        </div>
        <div class="horizontal-scroll-bis">
          <div class="horizontal-scroll-item-bis item-6"></div>
          <div class="horizontal-scroll-item-bis item-7"></div>
          <div class="horizontal-scroll-item-bis item-8"></div>
          <div class="horizontal-scroll-item-bis item-9"></div>
          <div class="horizontal-scroll-item-bis item-10"></div>	
          <div class="horizontal-scroll-item-bis item-6"></div>
          <div class="horizontal-scroll-item-bis item-7"></div>
          <div class="horizontal-scroll-item-bis item-8"></div>
          <div class="horizontal-scroll-item-bis item-9"></div>
          <div class="horizontal-scroll-item-bis item-10"></div>	
        </div>
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