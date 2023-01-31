export const capitalizeFirstLetter = (string: string): string =>  {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const convertEnumToOption = (any: object) => Object.values(any).map((key) => {label: capitalizeFirstLetter(key); value: key});
