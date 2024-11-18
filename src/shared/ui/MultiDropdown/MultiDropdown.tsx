import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import classNames from 'classnames';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase())));
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((selected) => selected.key === option.key);
    onChange(isSelected ? value.filter((selected) => selected.key !== option.key) : [...value, option]);
  };
  const multiDropdownClasses = classNames(styles.dropdown, className);

  return (
    <div className={multiDropdownClasses} ref={dropdownRef}>
      <Input
        value={value.length > 0 ? getTitle(value) : inputValue}
        onChange={(val) => setInputValue(val)}
        placeholder={value.length > 0 ? '' : getTitle([])}
        onFocus={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && !disabled && (
        <div className={styles.dropdown__options}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={`${styles.dropdown__option} ${value.some((v) => v.key === option.key) ? styles.dropdown__option_selected : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
