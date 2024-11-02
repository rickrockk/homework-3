import styles from "./GoBack.module.scss"
import {ScrollToTop} from "app/providers/router/ui/ScrollToTop";
import arrow from "../../../../../public/arrow.svg";
import Text from "shared/ui/Text";
import { useNavigate } from "react-router-dom"

export const GoBack = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <button onClick={handleClick} className={styles.goBack__link}>
            <div className={styles.goBack__container}>
                <img src={arrow} alt="Стрелочка"/>
                <Text view="p-20">Назад</Text>
            </div>
        </button>
    );
};