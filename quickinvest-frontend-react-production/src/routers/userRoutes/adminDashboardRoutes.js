import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Page404 from '../../containers/Page404NotFound/Page404'
import AdminDashboard from '../../containers/Admin.Container/Admin.Dashboard'

const adminDashboardRoutes = () => {
  return (
      <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
      </>
  )
}

export default adminDashboardRoutes