import { useState, useCallback } from 'react'

export default function QuizScreen({ settings, onFinish, onGoHome }) {
  const { questions } = settings
  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [log, setLog] = useState([])
  const [animKey, setAnimKey] = useState(0)

  const q = questions[idx]
  const progress = (idx / questions.length) * 100
  const isCorrect = selected !== null ? selected === q.answer : null

  const handleSelect = useCallback((i) => {
    if (answered) return
    const correct = i === q.answer
    setSelected(i)
    setAnswered(true)
    if (correct) setScore(s => s + 1)
    setLog(prev => [...prev, { q, correct, userAnswer: i }])
  }, [answered, q])

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      onFinish({ score: log.filter(l => l.correct).length + (isCorrect ? 0 : 0), total: questions.length, log: [...log] })
    } else {
      setIdx(i => i + 1)
      setAnswered(false)
      setSelected(null)
      setAnimKey(k => k + 1)
    }
  }

  const handleEarlyFinish = () => {
    onFinish({ score: log.filter(l => l.correct).length, total: log.length, log: [...log] })
  }

  const handleGoHome = () => {
    if (log.length === 0 || window.confirm('퀴즈를 종료하고 메인으로 돌아갈까요?')) {
      onGoHome()
    }
  }

  const optionStyle = (i) => {
    if (!answered) return 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
    if (i === q.answer) return 'bg-emerald-50 border-emerald-400 text-emerald-800'
    if (i === selected && i !== q.answer) return 'bg-rose-50 border-rose-400 text-rose-800'
    return 'bg-white border-gray-100 text-gray-400'
  }

  const optionIcon = (i) => {
    if (!answered) return <span className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">{['①','②','③','④'][i]}</span>
    if (i === q.answer) return <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
    if (i === selected) return <span className="w-7 h-7 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs font-bold">✗</span>
    return <span className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-300">{['①','②','③','④'][i]}</span>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6">
      {/* 상단 바 */}
      <div className="w-full max-w-2xl mb-4">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <button onClick={handleGoHome} className="px-3 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-95 transition-all">
              🏠 메인
            </button>
            <span className="font-semibold text-blue-700">{idx + 1} / {questions.length}</span>
          </div>
          <span className="font-bold text-blue-600">정답 {score}개</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* 문제 카드 */}
      <div key={animKey} className="w-full max-w-2xl animate-fadeInUp">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">📝 4지선다</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">{q.lecture}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">{q.category}</span>
            </div>
            <p className="text-gray-800 font-semibold text-base leading-relaxed">{q.question}</p>
          </div>

          {/* 보기 */}
          <div className="p-6 space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left text-sm font-medium transition-all ${optionStyle(i)}`}
              >
                {optionIcon(i)}
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {/* 해설 */}
          {answered && (
            <div className={`mx-6 mb-4 rounded-2xl p-4 animate-popIn ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
              <div className={`font-bold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? '✅ 정답!' : `❌ 오답 — 정답: ${q.options[q.answer]}`}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* 다음 버튼 */}
          {answered && (
            <div className="px-6 pb-6 flex flex-col gap-2">
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-cyan-600 active:scale-95 transition-all shadow"
              >
                {idx + 1 >= questions.length ? '결과 보기 🏁' : '다음 문제 →'}
              </button>
              {log.length > 0 && idx + 1 < questions.length && (
                <button
                  onClick={handleEarlyFinish}
                  className="w-full py-2 border border-blue-300 text-blue-600 rounded-2xl font-semibold text-sm hover:bg-blue-50 active:scale-95 transition-all"
                >
                  여기까지만 결과 보기 🏁
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
