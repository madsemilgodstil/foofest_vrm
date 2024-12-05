// app/pages/program/page.jsx
import React from 'react'
import Schedule from '@/components/schedule/Schedule'

const Program = () => {
  return (
    <div className="px-2 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Program</h1>
      <Schedule />
    </div>
  )
}

export default Program
