import React from 'react'

const styleH2 = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '60px',
  lineHeight: '73px',
  letterSpacing: '0.558461px',
}
const styleP = {
  fontFamily: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '28px',
  lineHeight: '34px',
  letterSpacing: '0.260615px',
}

function DataIndicator({ classStyle, value, name }) {
  return (
    <div className={classStyle}>
      <h2 style={styleH2}>{value}</h2>
      <hr width="547px" height="1px" align="left" color="#979797" />
      <p style={styleP}>{name}</p>
    </div>
  )
}

export default DataIndicator
