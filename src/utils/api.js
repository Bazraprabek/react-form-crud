export const getCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const resJson = await res.json();
  const sortedCountries = resJson.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  return sortedCountries;
};
