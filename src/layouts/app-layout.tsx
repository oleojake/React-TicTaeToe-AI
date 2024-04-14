import { GitHubTag, TopMenu } from "./components/index";


interface Props {
    children: React.ReactNode;
    changeCurrentGameMode (mode:string):void;
}

export const AppLayout: React.FC<Props> = (props) => {
	const {children, changeCurrentGameMode} = props;

	return (
        <>
        <TopMenu changeCurrentGameMode={changeCurrentGameMode}/>
		<GitHubTag/>
        {children}
        </>
	);
};