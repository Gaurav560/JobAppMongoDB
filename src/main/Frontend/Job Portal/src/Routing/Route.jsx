import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import AllJob from '../Pages/AllJob'
import CreateJob from '../Pages/CreateJob'

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllJob/>}></Route>
        <Route path="/create" element ={<CreateJob/>}></Route>
        {/* <Route path="/update" element={<UpdateJob/>}></Route> */}
      </Routes>
    </div>
  )
}

export default Routing
