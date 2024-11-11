import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
    > & {
    /** Дополнительный класс */
    className?: string;
    /** Значение поля */
    value: string;
    /** Callback, вызываемый при вводе данных в поле */
    onChange: (value: string) => void;
    /** Слот для иконки справа */
    afterSlot?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
         className,
         value,
         onChange,
         afterSlot,
         ...props },
     ref) => {

        const inputContainerClasses = classNames(
            styles.inputContainer,
            className
        );
        const inputClasses = classNames(
            styles.input,
            className,
        );

        return (
            <div className={inputContainerClasses}>
                <input
                    {...props}
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={props.placeholder}
                    className={inputClasses}
                />
                {afterSlot && (
                    <div className={styles.iconContainer}>
                        {afterSlot}
                    </div>
                )}
            </div>
        );
    }
);

export default Input;
