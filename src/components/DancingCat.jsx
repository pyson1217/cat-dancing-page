import { useEffect } from 'react'
import catSvg from '../assets/images/cat.svg'
import useAnimation from '../hooks/useAnimation'
import '../styles/DancingCat.css'

const DancingCat = () => {
  const {
    isAnimating,
    animationSpeed,
    toggleAnimation,
    setAnimationSpeed,
    resetAnimation
  } = useAnimation()

  // Apply dynamic animation speed
  useEffect(() => {
    const catElement = document.querySelector('.cat-image')
    if (catElement) {
      catElement.style.animationDuration = `${2/animationSpeed}s, ${3/animationSpeed}s, ${1.5/animationSpeed}s, ${4/animationSpeed}s`
    }
  }, [animationSpeed])

  const handleSpeedChange = (event) => {
    setAnimationSpeed(parseFloat(event.target.value))
  }

  return (
    <div className="dancing-cat-container">
      <div className={`dancing-cat ${isAnimating ? 'dancing' : 'stopped'}`}>
        <img src={catSvg} alt="Dancing Cat" className="cat-image" />
      </div>

      <div className="animation-controls">
        <div className="primary-controls">
          <button
            onClick={toggleAnimation}
            className="control-button primary"
            aria-label={isAnimating ? 'Stop dancing' : 'Start dancing'}
          >
            {isAnimating ? '⏸️ Stop Dancing' : '▶️ Start Dancing'}
          </button>

          <button
            onClick={resetAnimation}
            className="control-button secondary"
            aria-label="Reset animation to default"
          >
            🔄 Reset
          </button>
        </div>

        <div className="speed-control">
          <label htmlFor="speed-slider" className="speed-label">
            Dance Speed: <span className="speed-value">{animationSpeed.toFixed(2)}x</span>
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="speed-slider"
            aria-label="Animation speed control"
          />
          <div className="speed-markers">
            <span>Slow</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>

        <div className="animation-status">
          Status: <span className={isAnimating ? 'status-active' : 'status-paused'}>
            {isAnimating ? `Dancing at ${animationSpeed.toFixed(2)}x speed!` : 'Paused'}
          </span>
        </div>

        <div className="keyboard-hints">
          <p>⌨️ Keyboard Controls:</p>
          <div className="hints-grid">
            <span><kbd>Space</kbd> Play/Pause</span>
            <span><kbd>↑</kbd> Speed Up</span>
            <span><kbd>↓</kbd> Speed Down</span>
            <span><kbd>R</kbd> Reset</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DancingCat