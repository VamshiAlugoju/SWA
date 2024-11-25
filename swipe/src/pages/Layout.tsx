import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router';
import Navbar from '../components/Navbar';


function Layout() {

  const tabs = [
    {
      title: "Invoice",
      link: "invoice"
    },
    {
      title: "Products",
      link: "products"
    },
    {
      title: "Customers",
      link: 'customers'
    },

  ]
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='flex  w-screen' style={{ height: "90%" }}>
        <Sidebar width='15%' style={{ height: "100%" }}>
          <Menu
            menuItemStyles={{

            }}
          >

            <Link to="/upload">
              <MenuItem> Upload </MenuItem>

            </Link>
            <SubMenu label="Tabs">
              {tabs.map(tab => {
                return <Link key={tab.title} className='bg-blue-300' to={tab.link}> <MenuItem> {tab.title} </MenuItem> </Link>
              })}
            </SubMenu>

          </Menu>
        </Sidebar>
        <div style={{ width: "85%", height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout