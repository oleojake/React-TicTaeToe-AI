import classes from "./top-menu.component.module.css"
import {MODE} from "../../core/gamestatus"
import {API_KEY} from "../../core/IA/api/chatgpt-openia.api"

interface Props {
    changeCurrentGameMode (mode:string):void;
}

export const TopMenu: React.FC<Props> = (props) => {

    const {changeCurrentGameMode} = props;

    const handleClick = (mode:string) => {
        changeCurrentGameMode(mode);
    }

	return (
        <div className={classes.topMenu}>
            <button onClick={()=>handleClick(MODE.PvP)} autoFocus>1vs1</button>
            <p>IA:</p>
            <button onClick={()=>handleClick(MODE.IA_NOOB)}>Noob</button>
            <button onClick={()=>handleClick(MODE.IA_EASY)}>Easy</button>
            <button onClick={()=>handleClick(MODE.IA_MEDIUM)}>Medium</button>
            <button onClick={()=>handleClick(MODE.IA_CHATGPT)}
            className={
                (API_KEY === null)
                ? `${classes.disabled}`
                : ``
            }           
            disabled={API_KEY===null}
                > ChatGPT</button>
        </div>
	);
};