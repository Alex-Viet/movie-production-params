import { useState } from 'react';
import { DropdownInputProps } from '@/app/types';
import styles from './styles/DropdownInput.module.scss';

const DropdownInput: React.FC<DropdownInputProps> = ({
  text,
  name,
  placeholder,
  options,
  value,
  onChange,
  error,
  onBlur,
  setErrors,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen && onBlur) {
      onBlur();
    }

    setIsOpen(!isOpen);
  };

  // Функция-обработчик при выборе элемента из выпадающего меню
  const handleSelectOption = (option: string) => {
    const isSelected = value.includes(option);
    const updatedValue = isSelected
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(name, updatedValue);

    if (updatedValue.length > 0 && error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <label>
        {text}
        <input
          className={error ? styles.errorInput : ''}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value.join(', ')}
          onClick={toggleDropdown}
          readOnly
          required
        />
        {error && <span className={styles.errorMessage}>Заполните поле</span>}
      </label>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.dropdownItem} ${value.includes(option) ? styles.selected : ''}`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
