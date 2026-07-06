import { useForm } from 'react-hook-form';
import { bookingQuestForm } from '../../types/bookingQuestForm';
import { fetchBookingQuestPost } from '../../store/apiActions/apiActions';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APP_PATH } from '../../const';
import { useState, ChangeEvent } from 'react';
import { formatPhoneNumber, validateNameField } from '../../utils';

type QuestFormProps = {
  slots: {
    today: Array<{ time: string; isAvailable: boolean }>;
    tomorrow: Array<{ time: string; isAvailable: boolean }>;
  } | null;
  questPeopleCountMinMax: [number, number];
  placeId: string;
  questId: string;
};

function QuestForm({
  slots,
  questPeopleCountMinMax,
  placeId,
  questId,
}: QuestFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<bookingQuestForm>();

  if (!slots) {
    return (
      <p className="booking-form__error">Информация о времени недоступна</p>
    );
  }

  const onSubmit = async (data: bookingQuestForm): Promise<void> => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      data.placeId = placeId;
      const result = await dispatch(
        fetchBookingQuestPost({
          questId,
          placeId,
          data,
        }),
      );

      if (fetchBookingQuestPost.rejected.match(result)) {
        setSubmitError(
          (result.payload as string) || 'Произошла ошибка при бронировании',
        );
        setIsSubmitting(false);
        return;
      }

      navigate(APP_PATH.PAGE_MYQUEST);
    } catch (error) {
      setSubmitError('Произошла непредвиденная ошибка');
      setIsSubmitting(false);
    }
  };

  const validatePeopleCount = (value: number): string | true => {
    const [min, max] = questPeopleCountMinMax;

    if (!value && value !== 0) {
      return 'Укажите количество участников';
    }
    if (value < min) {
      return `Минимальное количество участников: ${min}`;
    }
    if (value > max) {
      return `Максимальное количество участников: ${max}`;
    }
    return true;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
      className="booking-form"
      method="post"
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {slots.today.map((day) => (
              <label key={day.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  {...register('date', { required: 'Выберите дату и время' })}
                  disabled={!day.isAvailable}
                  value="today"
                  onChange={(e) => {
                    if (e.target.checked) {
                      register('time').onChange({
                        target: { value: day.time, name: 'time' },
                      });
                    }
                  }}
                />
                <span className="custom-radio__label">{day.time}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {slots.tomorrow.map((day) => (
              <label key={day.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  {...register('date', { required: 'Выберите дату и время' })}
                  disabled={!day.isAvailable}
                  value="tomorrow"
                  onChange={(e) => {
                    if (e.target.checked) {
                      register('time').onChange({
                        target: { value: day.time, name: 'time' },
                      });
                    }
                  }}
                />
                <span className="custom-radio__label">{day.time}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {errors.date && (
          <span className="booking-form__error" role="alert">
            {errors.date.message}
          </span>
        )}
        {errors.time && (
          <span className="booking-form__error" role="alert">
            {errors.time.message}
          </span>
        )}
      </fieldset>

      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            disabled={isSubmitting}
            {...register('contactPerson', {
              required: 'Укажите ваше имя',
              validate: validateNameField,
            })}
            aria-invalid={errors.contactPerson ? 'true' : 'false'}
            placeholder="Имя"
          />
          {errors.contactPerson && (
            <span className="booking-form__error" role="alert">
              {errors.contactPerson.message}
            </span>
          )}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
            Контактный телефон
          </label>
          <input
            type="tel"
            id="tel"
            value={phoneValue}
            onChange={handlePhoneChange}
            disabled={isSubmitting}
            placeholder="+7 (000) 000-00-00"
          />
          {errors.phone && (
            <span className="booking-form__error" role="alert">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
            Количество участников
          </label>
          <input
            type="number"
            id="person"
            disabled={isSubmitting}
            {...register('peopleCount', {
              required: 'Укажите количество участников',
              valueAsNumber: true,
              validate: validatePeopleCount,
            })}
            aria-invalid={errors.peopleCount ? 'true' : 'false'}
            placeholder={`Количество участников (от ${questPeopleCountMinMax[0]} до ${questPeopleCountMinMax[1]})`}
            min={questPeopleCountMinMax[0]}
            max={questPeopleCountMinMax[1]}
          />
          {errors.peopleCount && (
            <span className="booking-form__error" role="alert">
              {errors.peopleCount.message}
            </span>
          )}
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            disabled={isSubmitting}
            {...register('withChildren')}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">
            Со&nbsp;мной будут дети
          </span>
        </label>
      </fieldset>

      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Бронирование...' : 'Забронировать'}
      </button>

      {submitError && (
        <div
          className="booking-form__error"
          role="alert"
          style={{ textAlign: 'center', fontSize: '30px' }}
        >
          {submitError}
        </div>
      )}

      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" required disabled={isSubmitting} />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">
            правилами обработки персональных данных
          </a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default QuestForm;
