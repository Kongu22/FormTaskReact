import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const nav = useNavigate()
  

  const onGoClick = () => {
    nav('/vip')
  }
  return (
    <div>
      About
      <br/>
      <button onClick={onGoClick}>Go to Vip</button>
    </div>
  )
}