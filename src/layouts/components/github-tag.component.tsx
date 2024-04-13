import classes from "./github-tag.component.module.css"

export const GitHubTag: React.FC = () => {

	return (
        <>
		<div className={classes.iconBar}>
            <a href="https://github.com/oleojake" target="_blank" ><i className={`${classes.fa} fa fa-github`}></i>OleojakeDEV</a>
        </div>
        </>
	);
};