import './View.css';
import { MyButton } from './MyButton.jsx';

export function PageStats({onFinish}){
  return(
 
    <div className="Container" color='#ffffff'>
        <MyButton couleur="#24292e" symbole=" ←" top = "8%" left="5%" onClick={onFinish}/>
    </div>
    )

}
