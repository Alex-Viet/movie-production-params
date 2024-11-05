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

  // Загружаем данные из localStorage, если они есть
  useEffect(() => {
    const savedData = localStorage.getItem('movieProductionForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Сохраняем данные в localStorage
  useEffect(() => {
    localStorage.setItem('movieProductionForm', JSON.stringify(formData));
  }, [formData]);

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

  const handleNextStep = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    evt.preventDefault();

    if (isNextStepActive) {
      console.log(formData);
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} action="#">
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Производственные параметры фильма</h1>
          <div className={styles.cancelBtnContainer}>
            <button className={styles.button}>Отменить заполнение</button>
          </div>
        </div>
        <div className={styles.formContainer}>
          <label>
            Название проекта
            <input
              type="text"
              name="projectName"
              placeholder="Название"
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              required
            />
          </label>
          <DropdownInput
            text="Страна-производитель (копродукция)"
            name="country"
            placeholder="Страна"
            options={countries}
            value={formData.country}
            onChange={handleChange}
          />
          <div className={styles.inputContainer}>
            <DropdownInput
              text="Жанр"
              name="genre"
              placeholder="Жанр"
              options={genres}
              value={formData.genre}
              onChange={handleChange}
            />
            <DropdownInput
              text="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
              name="format"
              placeholder="Формат"
              options={formats}
              value={formData.format}
              onChange={handleChange}
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
