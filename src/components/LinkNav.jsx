import { Link } from "react-router-dom"

function LinkNav({ path, content, className }) {
  return (
    <Link key={content} className={`kanit-regular text-decoration-none linkNav mb-1 ${className}`} to={path} >{content}</Link>
  )
}

export default LinkNav