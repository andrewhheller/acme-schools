import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Nav = ({ schoolCount, studentCount, path }) => {

  // displays "active" button based on current URL path
  const selected = (selectedPath, path) => {

    if(path.includes(selectedPath)) {
      return "nav-button nav-selected"
    }

    return "nav-button"
  }
  
  return (
    schoolCount && studentCount ?

      <div className="nav">
       
        <div className="nav-grid-container">

          <div className="nav-grid-item-1">
            <Link to="/">
              <button className={ path === "/" ? "nav-button nav-selected" : "nav-button" }>
                Home
              </button>
            </Link>
          </div>

          <div className="nav-grid-item-2">
            <Link to="/schools">
              <button className={ selected("/schools", path) }>
                Schools ({schoolCount})
              </button>
            </Link>
          </div>

          <div className="nav-grid-item-3">
            <Link to="/students">
              <button className={ selected("/students", path) }>
                Students ({studentCount})
              </button>
            </Link>
          </div>

        </div>

      </div>

      : ''

  )

}

const mapStateToProps = ({ schools, students }, { location }) => {

  // console.log(location.pathname);
  const path = location.pathname;

  return {
    schoolCount: schools.length,
    studentCount: students.length,
    path
  }
}

export default connect(mapStateToProps)(Nav);
