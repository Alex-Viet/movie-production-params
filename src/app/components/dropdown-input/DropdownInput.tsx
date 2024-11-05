import { useEffect, useRef, useState } from 'react';
import { DropdownInputProps } from '@/app/types';
import styles from './styles/DropdownInput.module.scss';

const DropdownInput: React.FC<DropdownInputProps> = ({
  text,
  name,
  placeholder,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Функция-обработчик при выборе элемента из выпадающего меню
  const handleSelectOption = (option: string) => {
    const isSelected = value.includes(option);
    const updatedValue = isSelected
      ? value.filter((item) => item !== option)
      : [...value, option];
    onChange(name, updatedValue);
  };

  // Функция-обработчик клика вне выпадающего меню
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <label>
        {text}
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value.join(', ')}
          onClick={toggleDropdown}
          readOnly
          required
        />
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
