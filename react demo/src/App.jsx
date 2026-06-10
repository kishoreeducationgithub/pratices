import React from 'react'
// import Header from './components/Header'
// import MainContent from './components/MainContent'
// import Footer from './components/Footer'
const App = () => {
  const UserDeatails = [
  {
    "id": 1,
    "userName": "Kishore",
    "role": "Frontend Developer",
    "location": "Hyderabad, India"
  },
  {
    "id": 2,
    "userName": "Anjali",
    "role": "Product Manager",
    "location": "Bangalore, India"
  },
  {
    "id": 3,
    "userName": "Rahul",
    "role": "Backend Engineer",
    "location": "Pune, India"
  }
]
  return (
    <main>
      <h1>User list</h1>
      {UserDeatails.map(({ id,userName, role, location }) => (
        <div>

          <ul key={Math.random()}>
            <li>{userName}</li>
            <li>{role}</li>
            <li>{location}</li>
          </ul>
        </div>
      ))}
    </main>
  )
}

export default App