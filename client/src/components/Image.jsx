import React from 'react'

export default function Image({src, ...rest}) {
    // src = src && src.includes("https://") ? "uploads/" + src : "http://localhost:4000/" + src;
    src = src && src.includes("https://") ? "uploads/" + src : "https://dentalclinic.onrender.com/" + src;
  return (
    <img {...rest} src={src} alt={""}/>
  )
}
