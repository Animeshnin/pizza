import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    className="pizza-block"
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="138" /> 
    <rect x="0" y="298" rx="15" ry="15" width="280" height="32" /> 
    <rect x="0" y="340" rx="15" ry="15" width="280" height="73" /> 
    <rect x="0" y="424" rx="15" ry="15" width="130" height="31" /> 
    <rect x="150" y="424" rx="15" ry="15" width="125" height="31" />
  </ContentLoader>
)

export default Skeleton

