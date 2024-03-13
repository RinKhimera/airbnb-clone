import countries from "world-countries"

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region,
}))

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted

  const getCountryByValue = (country: string) => {
    return countriesFormatted.find((item) => item.value === country)
  }

  return {
    getAllCountries,
    getCountryByValue,
  }
}
