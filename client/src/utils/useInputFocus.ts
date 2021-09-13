import { useRef, useEffect } from "react"
export default function useInputFocus() {
  const ref = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if(!ref.current) return 
    ref.current.focus()
  }, [])
  return ref
}