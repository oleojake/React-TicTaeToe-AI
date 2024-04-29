

interface Props {
	children: React.ReactNode;
	currentGameMode: string;
	changeCurrentGameMode(mode: string): void;
}

export const AppLayout: React.FC<Props> = (props) => {
	const { children} = props;

	return (
		<>

			{children}
		</>
	);
};
