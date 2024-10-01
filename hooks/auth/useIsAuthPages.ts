import { useRouter } from "next/router";


import {  useState } from 'react'

interface ReturnType {
}

function IsAuthPages(initialValue?: number): ReturnType {

    const AuthPagesPath = useRouter().pathname

  return  (AuthPagesPath === '/login' || AuthPagesPath === '/signup' ) ? true : false
}

export default IsAuthPages
