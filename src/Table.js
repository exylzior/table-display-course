import React, { Fragment } from 'react'

const UserRow = ({ user: { id, name, phone, email } }) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  )
}

const CourseRow = ({
  options,
  currency,
  exchangeRate,
  filterCourseByUserId,
  user,
  courses,
}) => {
  const convertCurrency = exchangeRate[currency]
  const userCourses = filterCourseByUserId(courses, user.id)
  if (userCourses.length > 0 && exchangeRate.hasOwnProperty(currency)) {
    return userCourses.map(
      ({ course_name, course_selection, semester, semester_fee, id }) => (
        <tr key={id}>
          <td></td>
          <td></td>
          <td></td>
          <td>{course_name}</td>
          <td>{course_selection}</td>
          <td>{semester}</td>
          <td>{`${options[currency].symbol} ${(
            semester_fee * convertCurrency
          ).toFixed(options[currency].decimal_digits)}`}</td>
        </tr>
      )
    )
  } else {
    return (
      <tr>
        <td colSpan={7}>"No data found"</td>
      </tr>
    )
  }
}

const Table = ({
  result,
  courses,
  sortByParameter,
  options,
  currency,
  exchangeRate,
  isLoading,
}) => {
  const filterCourseByUserId = (courses, user) => {
    return courses.filter(({ user_id }) => user_id === user)
  }

  const courseProps = {
    options,
    currency,
    exchangeRate,
    courses,
    filterCourseByUserId
  }

  const hasProps = exchangeRate.hasOwnProperty(currency)
  if (hasProps) {
    return (
      <table key={1} className='content'>
        <thead>
          <tr>
            <th>
              Name{' '}
              <span onClick={() => sortByParameter('name', result, 'asc')}>
                &#x25b4;
              </span>
              <span onClick={() => sortByParameter('name', result, 'desc')}>
                &#x25be;
              </span>
            </th>
            <th>
              Phone{' '}
              <span onClick={() => sortByParameter('phone', result, 'asc')}>
                &#x25b4;
              </span>
              <span onClick={() => sortByParameter('phone', result, 'desc')}>
                &#x25be;
              </span>
            </th>
            <th>
              Email{' '}
              <span onClick={() => sortByParameter('email', result, 'asc')}>
                &#x25b4;
              </span>
              <span onClick={() => sortByParameter('email', result, 'desc')}>
                &#x25be;
              </span>
            </th>
            <th>Course Name</th>
            <th>Course Selection</th>
            <th>Semester</th>
            <th>Semester Fee</th>
          </tr>
        </thead>
        <tbody>
          {result.length > 0 &&
            result.map((user) => (
              <Fragment>
                <UserRow {...{ user }} />
                <CourseRow
                  {...{ ...courseProps, user }}
                />
              </Fragment>
            ))}
          {}
        </tbody>
      </table>
    )
  } else if (isLoading) {
    return <div className='content'>...Loading</div>
  } else {
    return <div className='content'>"Unsupported currency type"</div>
  }
}

export default Table
