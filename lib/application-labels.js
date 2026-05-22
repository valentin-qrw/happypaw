export const getExperienceLabel = (experience) => {
  const labels = {
    "first-time": "Без попереднього досвіду",
    some: "Є певний досвід",
    experienced: "Досвідчений власник",
    professional: "Професійний досвід (ветеринар, кінолог, тощо)",
  };

  return labels[experience] || experience;
};

export const getLivingSpaceLabel = (livingSpace) => {
  const labels = {
    apartment: "Квартира",
    "house-no-yard": "Будинок без подвір’я",
    "house-small-yard": "Будинок з невеликим подвір’ям",
    "house-large-yard": "Будинок з великим подвір’ям",
    other: "Інше",
  };

  return labels[livingSpace] || livingSpace;
};

export const getWorkScheduleLabel = (workSchedule) => {
  const labels = {
    "work-from-home": "Робота з дому",
    "part-time": "Неповний робочий день (до 6 годин)",
    "full-time": "Повний робочий день (6-8 годин)",
    "long-hours": "Довгий робочий день (понід 8 годин)",
    retired: "Не працює / на пенсії",
    student: "Студент",
  };

  return labels[workSchedule] || workSchedule;
};

export const getOtherPetsLabel = (otherPets) => {
  const labels = {
    none: "Немає інших тварин",
    dogs: "Є собаки",
    cats: "Є коти",
    both: "Є коти і собаки",
    other: "Є інші тварини",
  };

  return labels[otherPets] || otherPets;
};