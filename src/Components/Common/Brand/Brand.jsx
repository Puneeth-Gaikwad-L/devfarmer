import React from 'react'

function Brand({ width = 150 }) {
  return (
    <div>
      <img src="/brand.png" alt="DevFarmer" width={width}/>
    </div>
  )
}

export default Brand