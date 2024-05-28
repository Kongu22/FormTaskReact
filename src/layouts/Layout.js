import React from 'react'
import { Outlet } from 'react-router-dom'
import Header1 from '../Components/Header1'

export default function Layout() {
  return (
    <>
        <Header1 />
        <Outlet />
    </>
  )
}
