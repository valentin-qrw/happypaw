export const getPetTypeLabel = (type) => {
  const types = {
    dog: "Собака",
    cat: "Кіт",
    bird: "Птах",
    rodent: "Гризун",
    other: "Інше",
  };

  return types[type] || type;
};

export const getPetSizeLabel = (size) => {
  const normalizedSize = size?.toLowerCase();

  const sizes = {
    small: "Малий",
    medium: "Середній",
    large: "Великий",
  };

  return sizes[normalizedSize] || size;
};

export const getPetGenderLabel = (gender) => {
  const genders = {
    male: "Самець",
    female: "Самка",
  };

  return genders[gender] || gender;
};

export const getActivityLevelLabel = (activityLevel) => {
  const levels = {
    low: "Низький",
    medium: "Середній",
    high: "Високий",
  };

  return levels[activityLevel] || activityLevel;
};

export const getAgeLabel = (age) => {
  const value = Number(age);

  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "років";
  }

  if (lastDigit === 1) {
    return "рік";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "роки";
  }

  return "років";
};