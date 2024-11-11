import React from 'react';
import styles from './CheckBox.module.scss';
import Icon from "../icons/Icon";
import CheckIcon from "shared/ui/icons/CheckIcon";
import classNames from "classnames";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
    className?: string;
    checked?: boolean;
    disabled?: boolean;
    /** Вызывается при клике на чекбокс */
    onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
    className,
    disabled,
    checked,
    onChange,
    ...props
}) => {
    const checkboxClasses = classNames(styles.checkbox, className, {
        [styles.checkbox_disabled]: disabled,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <label className={styles.checkbox__label}>
            <input
                className={styles.input}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />
            <span className={checkboxClasses}>
                {checked && (
                    <div className={styles.icon__wrapper}>
                        <Icon width={40} height={40}>
                            <CheckIcon color={disabled ? "secondary" : "accent"} disabled={disabled}/>
                        </Icon>
                    </div>
                )}
            </span>
        </label>
    );
};


export default CheckBox;
