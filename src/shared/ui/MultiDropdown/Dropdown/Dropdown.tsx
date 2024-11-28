import React, { useState, useEffect, useRef } from 'react';
import Input from 'shared/ui/Input';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import ArrowDownIcon from 'shared/ui/icons/ArrowDownIcon';
import { Option } from 'shared/ui/MultiDropdown';

export type DropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущая выбранная опция */
  value: Option | undefined;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option | null) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку, которая будет выводиться в инпуте. Если опция не выбрана, строка должна отображаться как placeholder. */
  getTitle: (value: Option | null) => string;
};

const Dropdown: React.FC<DropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
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
    if (value?.key === option.key) {
      onChange(null);
    } else {
      onChange(option);
    }
    setIsOpen(false);
  };

  const dropdownClasses = classNames(styles.dropdown, className);

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      <Input
        value={value ? getTitle(value) : inputValue}
        onChange={(val) => setInputValue(val)}
        placeholder={value ? '' : getTitle(null)}
        onFocus={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && !disabled && (
        <div className={styles.dropdown__options}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={`${styles.dropdown__option} ${value?.key === option.key ? styles.dropdown__option_selected : ''}`}
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

export default Dropdown;
