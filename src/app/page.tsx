'use client';
import { useEffect, useState } from 'react';
import { FormData } from './types';
import DropdownInput from './components/dropdown-input/DropdownInput';
import { countries, formats, genres } from './mockData';
import styles from './page.module.scss';

export default function Home() {
  const initialData: FormData = {
    projectName: '',
    genre: [],
    format: [],
    unfNumber: '',
    country: [],
    budget: undefined,
    synopsis: '',
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [isNextStepActive, setIsNextStepActive] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Загружаем данные из localStorage, если они есть
  useEffect(() => {
    const savedData = localStorage.getItem('movieProductionForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Валидация формы
  useEffect(() => {
    const { projectName, genre, format, country } = formData;
    setIsNextStepActive(
      Boolean(projectName && genre.length && format.length && country.length),
    );
  }, [formData]);

  const handleChange = (name: string, value: string[] | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик кнопки отмены заполнения
  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
    localStorage.removeItem('movieProductionForm');
  };

  // Обработчик кнопки перехода на след шаг
  const handleNextStep = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    evt.preventDefault();

    if (isNextStepActive) {
      console.log(formData);
      // Сохраняем данные в localStorage
      localStorage.setItem('movieProductionForm', JSON.stringify(formData));
    }
  };

  // Обработчик ошибок при пустом поле ввода
  const handleBlur = (field: keyof FormData) => {
    const value = formData[field];

    if (
      !value ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} action="#">
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Производственные параметры фильма</h1>
          <div className={styles.cancelBtnContainer}>
            <button className={styles.button} onClick={handleCancel}>
              Отменить заполнение
            </button>
          </div>
        </div>
        <div className={styles.formContainer}>
          <label>
            Название проекта
            <input
              className={errors.projectName ? styles.errorInput : ''}
              type="text"
              name="projectName"
              placeholder="Название"
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              onBlur={() => handleBlur('projectName')}
              required
            />
            {errors.projectName && (
              <span className={styles.errorMessage}>Заполните поле</span>
            )}
          </label>
          <DropdownInput
            text="Страна-производитель (копродукция)"
            name="country"
            placeholder="Страна"
            options={countries}
            value={formData.country}
            onChange={handleChange}
            onBlur={() => handleBlur('country')}
            error={errors.country}
            setErrors={setErrors}
          />
          <div className={styles.inputContainer}>
            <DropdownInput
              text="Жанр"
              name="genre"
              placeholder="Жанр"
              options={genres}
              value={formData.genre}
              onChange={handleChange}
              onBlur={() => handleBlur('genre')}
              error={errors.genre}
              setErrors={setErrors}
            />
            <DropdownInput
              text="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
              name="format"
              placeholder="Формат"
              options={formats}
              value={formData.format}
              onChange={handleChange}
              onBlur={() => handleBlur('format')}
              error={errors.format}
              setErrors={setErrors}
            />
            <label>
              № УНФ или отсутствует
              <input
                type="text"
                name="unfNumber"
                placeholder="890-000-000-00-000"
                value={formData.unfNumber}
                onChange={(e) =>
                  setFormData({ ...formData, unfNumber: e.target.value })
                }
                pattern="\d{3}-\d{3}-\d{3}-\d{2}-\d{3}"
              />
            </label>
          </div>
          <label>
            Сведения о сметной стоимости производства фильма на территории
            Нижегородской области, если есть
            <input
              type="number"
              name="budget"
              placeholder="Сметная стоимость"
              value={formData.budget || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
            />
          </label>
          <div className={`${styles.textareaContainer} ${styles.row}`}>
            <label>
              Синопсис
              <textarea
                name="synopsis"
                placeholder="Напишите краткое изложение"
                value={formData.synopsis}
                onChange={(e) =>
                  setFormData({ ...formData, synopsis: e.target.value })
                }
              />
            </label>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.pagination}>
            1 2 ... 4
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19L17 21ZM30.7071 19.2929C31.0976 19.6834 31.0976 20.3166 30.7071 20.7071L24.3431 27.0711C23.9526 27.4616 23.3195 27.4616 22.9289 27.0711C22.5384 26.6805 22.5384 26.0474 22.9289 25.6569L28.5858 20L22.9289 14.3431C22.5384 13.9526 22.5384 13.3195 22.9289 12.9289C23.3195 12.5384 23.9526 12.5384 24.3431 12.9289L30.7071 19.2929ZM17 19L30 19L30 21L17 21L17 19Z"
                fill="#121212"
              />
            </svg>
          </div>
          <button
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={(e) => handleNextStep(e)}
            disabled={!isNextStepActive}
          >
            Следующий шаг
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
}
