import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toastError from '../utils/toasterror'

const IsAdmin = ({children}) => {
  const user = useSelector(state=>state.user)

  return <>{user?.role === "ADMIN" ? children : toastError()}</>
}

export default IsAdmin
