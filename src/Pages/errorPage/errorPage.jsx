import react from "react";
import Styles from "./errorPage.module.css";

function ErrorPage() {
    return(
        <div className={Styles.container}>
        <div className={Styles.heading}>404</div>
        <div className={Styles.subheading}>Oops! You've landed on the wrong page.</div>
        <a href="javascript:history.back()" className={Styles.backButton}>Go back to previous page</a>
    </div>
    )
}

export  {ErrorPage};