import React from 'react'

function Footer() {
  return (
    <>
    <div className='flex  align-middle justify-between mt-10 mx-10 p-2 text-gray-50 border-t-2  border-gray-400 border-b-2 '>
        <p>Copyright © 2019  HodlInfo.com</p>
        <p>Support</p>
    </div>
    <div className='flex  justify-center align-middle p-2'>
<button className='p-2 border-2   border-cyan-500 rounded-md text-cyan-500'>Add hodlinfo to home screen</button>
    </div>
    </>
  )
}

export default Footer