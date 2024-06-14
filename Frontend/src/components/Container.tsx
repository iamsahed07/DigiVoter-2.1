
import { ReactNode } from "react"

interface ContainerType{
  className?:string;
  children?:ReactNode;
  width?: string
}
export const Container = ({className="",children,width="full"}:ContainerType) => {
  return (
    <div className={`w-${width} ${className} flex flex-col`} >
        {children}
    </div>
  )
}
