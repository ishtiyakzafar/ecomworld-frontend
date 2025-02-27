import React from 'react';
import './Sidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { sideBarMenu } from '../../Helper/data';


const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className='sidebar_box'>
      <div className='sidebar'>
        <ul>
          {
            sideBarMenu.map((item) => (
              <li
                className={item.path === pathname ? 'active' : ''}
                key={item.id}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};

export default Sidebar;