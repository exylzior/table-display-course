import React, { useEffect, useState } from 'react'
import Table from './Table'
import Search from './Search'
import Dropdown from './Dropdown'
import { getFecthUsers, getFecthCourses } from './api'

const App = () => {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [result, setResult] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [options, setOptions] = useState({})
  const [exchangeRate, setExchangeRate] = useState({})
  const [currency, setCurrency] = useState('USD')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getFecthUsers().then((result) => {
      setUsers(result)
      setResult(result)
    })
  }, [])

  useEffect(() => {
    getFecthCourses().then((result) => {
      const clean = removeCourseDuplicate(result)
      setCourses(clean)
    })
  }, [])

  const handleOnchange = (event) => {
    setSearchQuery(event.target.value)
    if (!event.target.value) {
      setResult(users)
    } else {
      let term = new RegExp(event.target.value, 'i')
      const search = users.filter(
        ({ name, phone, email }) =>
          name.match(term) || phone.match(term) || email.match(term)
      )
      setResult(search)
    }
  }

  const handleCurrency = (event) => {
    setCurrency(event.target.value)
  }

  const removeCourseDuplicate = (courses) => {
    let result = courses.filter((course, index, self) => {
      return (
        index ===
        self.findIndex(
          ({ course_name, course_selection, semester }) =>
            course_name === course.course_name &&
            course_selection === course.course_selection &&
            semester === course.semester
        )
      )
    })
    return result
  }

  const sortByParameter = (key, list, direction) => {
    setSortDirection(sortDirection)
    const copyList = [...list]
    if (direction === 'asc') {
      copyList.sort((a, b) => (a[key] > b[key] ? 1 : -1))
    } else {
      copyList.sort((a, b) => (a[key] < b[key] ? 1 : -1))
    }
    setResult(copyList)
  }

  return (
    <div className='App'>
      <Search {...{ searchQuery, handleOnchange }} />
      <Dropdown
        {...{
          options,
          setOptions,
          setExchangeRate,
          handleCurrency,
          currency,
          setLoading,
        }}
      />
      <Table
        {...{
          result,
          courses,
          searchQuery,
          sortByParameter,
          options,
          currency,
          exchangeRate,
          isLoading,
        }}
      />
    </div>
  )
}

export default App
