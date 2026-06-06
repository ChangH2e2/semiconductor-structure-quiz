import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [settings, setSettings] = useState(null)
  const [results, setResults] = useState(null)

  const handleStart = (s) => { setSettings(s); setScreen('quiz') }
  const handleFinish = (r) => { setResults(r); setScreen('result') }
  const handleRestart = () => { setSettings(null); setResults(null); setScreen('start') }
  const handleRestartSame = () => { setResults(null); setScreen('quiz') }

  return (
    <div className="min-h-screen bg-slate-100">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'quiz' && (
        <QuizScreen
          settings={settings}
          onFinish={handleFinish}
          onGoHome={handleRestart}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          results={results}
          onRestart={handleRestart}
          onRestartSame={handleRestartSame}
        />
      )}
    </div>
  )
}
