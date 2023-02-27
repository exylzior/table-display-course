const userEndpoint =
  'https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json'
const userCourseEndpoint =
  'https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json'
const currencyEndpoint =
  'https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json'
const exchangeRateEndpoint = `https://v6.exchangerate-api.com/v6/1ec446a8a182f13c061f75fe/latest/USD`

export const getFecthUsers = async () => {
  const response = await fetch(userEndpoint).then((res) => res.json())
  return response
}

export const getFecthCourses = async () => {
  const response = await fetch(userCourseEndpoint).then((res) => res.json())
  return response
}

export const getCurrencyOptions = async () => {
  const response = await fetch(currencyEndpoint).then((res) => res.json())
  return response
}

export const getExchangeRate = async () => {
  const response = await fetch(exchangeRateEndpoint).then((res) => res.json())
  return response
}
