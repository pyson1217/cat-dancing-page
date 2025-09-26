import { useState, useEffect, useCallback } from 'react'

const useAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [volume, setVolume] = useState(0.5)

  // Toggle animation
  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => !prev)
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.code) {
        case 'Space':
          event.preventDefault()
          toggleAnimation()
          break
        case 'ArrowUp':
          event.preventDefault()
          setAnimationSpeed(prev => Math.min(prev + 0.25, 3))
          break
        case 'ArrowDown':
          event.preventDefault()
          setAnimationSpeed(prev => Math.max(prev - 0.25, 0.25))
          break
        case 'KeyR':
          event.preventDefault()
          setAnimationSpeed(1)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [toggleAnimation])

  // Animation state management
  const resetAnimation = useCallback(() => {
    setAnimationSpeed(1)
    setIsAnimating(true)
  }, [])

  return {
    isAnimating,
    animationSpeed,
    volume,
    toggleAnimation,
    setAnimationSpeed,
    setVolume,
    resetAnimation
  }
}

export default useAnimation