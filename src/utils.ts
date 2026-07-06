export function convertImgSize(path: string): string {
  const lastDot = path.lastIndexOf('.');
  return `${path.slice(0, lastDot)}@2x${path.slice(lastDot)} 2x`;
}

export const validateNameField = (value: string): string | true => {
  if (!value || value.trim().length === 0) {
    return 'Укажите ваше имя';
  }
  if (value.length < 1 || value.length > 15) {
    return 'Имя должно содержать от 1 до 15 символов';
  }
  return true;
};

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  const limitedDigits = digits.slice(0, 11);

  let formatted = '';
  if (limitedDigits.length > 0) {
    formatted = '+7';
    if (limitedDigits.length > 1) {
      formatted += ` (${limitedDigits.slice(1, 4)}`;
      if (limitedDigits.length > 4) {
        formatted += `) ${limitedDigits.slice(4, 7)}`;
        if (limitedDigits.length > 7) {
          formatted += `-${limitedDigits.slice(7, 9)}`;
          if (limitedDigits.length > 9) {
            formatted += `-${limitedDigits.slice(9, 11)}`;
          }
        }
      } else {
        formatted += ')';
      }
    }
  }

  return formatted;
};

export const translateDate = (date: string): string => {
  if (date === 'today') {
    return 'сегодня';
  }
  if (date === 'tomorrow') {
    return 'завтра';
  }
  return date;
};
