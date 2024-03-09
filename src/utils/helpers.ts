export const handleYearRange = (years: number[]) => {
  const newArray = [];
  const start = years[0];
  const end = years[years.length - 1];
  for (let i = start; i <= end; i++) {
    newArray.push(i);
  }

  return newArray;
};
