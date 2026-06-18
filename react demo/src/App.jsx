// Optional components (not used in the current User List view):
// import Header from './components/Header'
// import MainContent from './components/MainContent'
// import Footer from './components/Footer'

/**
 * Main App component that renders a list of user details.
 * 
 * @returns {React.JSX.Element} The rendered App component.
 */
const App = () => {
  // Static array containing user information
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
      {/* Map through user details and render each in an unordered list */}
      {UserDeatails.map(({ id, userName, role, location }) => (
        <div key={id}>
          <ul>
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