import classes from "./top-menu.component.module.css"
import {MODE} from "../../core"

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
            <button onClick={()=>handleClick(MODE.PvP)}>1vs1</button>
            <p>IA:</p>
            <button onClick={()=>handleClick(MODE.IA_NOOB)}>Noob</button>
            <button onClick={()=>handleClick(MODE.IA_EASY)}>Easy</button>
            <button onClick={()=>handleClick(MODE.IA_MEDIUM)}>Medium</button>
            <button onClick={()=>handleClick(MODE.IA_CHATGPT)}> ChatGPT</button>
        </div>
	);
};