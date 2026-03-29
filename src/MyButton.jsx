export function MyButton({couleur, symbole, top, right, left, onClick}) {
  return (
    <button 
      className="Mon-bouton" 
      onClick={onClick}
      style={{ 
        backgroundColor: couleur,  
        top: top, 
        right: right,
        left: left 
      }}
    >
      {symbole}
    </button>
  );
}