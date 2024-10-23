"use client"
import Flipbook from './_components/MyBook'
import Flipbook2 from './_components/MyBook2'


const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-y-10'>
      <Flipbook />
      <Flipbook2 />
    </div>
  )
}

export default page
