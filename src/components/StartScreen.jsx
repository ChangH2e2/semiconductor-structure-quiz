import { useState } from 'react'
import { questions, LECTURES } from '../data/questions'

export default function StartScreen({ onStart }) {
  const [lecture, setLecture] = useState('all')
  const [count, setCount] = useState(10)

  const filtered = questions.filter(q => lecture === 'all' || q.lecture === lecture)
  const maxCount = filtered.length
  const safeCount = Math.min(count, maxCount)

  const handleStart = () => {
    if (maxCount === 0) return
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, safeCount)
    onStart({ questions: shuffled, lecture, count: safeCount })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💡</div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">반도체 구조 기술 퀴즈</h1>
          <p className="text-gray-500 text-sm">8~13강 기말고사 대비 | 4지선다 | 총 {questions.length}문제</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
          {/* 강의 선택 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">강의 범위</h2>
            <div className="flex flex-wrap gap-2">
              {LECTURES.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLecture(l.id)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                    lecture === l.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* 문제 수 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              문제 수 <span className="text-blue-600 font-bold">{safeCount}문제</span>
              <span className="ml-2 text-xs text-gray-400">(선택 가능: {maxCount}문제)</span>
            </h2>
            <div className="flex gap-2 flex-wrap">
              {[5, 10, 15, 20, 30].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  disabled={n > maxCount}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                    count === n
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setCount(maxCount)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                  count === maxCount && maxCount > 0
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
              >
                전체({maxCount})
              </button>
            </div>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={handleStart}
            disabled={maxCount === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {maxCount === 0 ? '해당 문제가 없습니다' : '퀴즈 시작 🚀'}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          📝 4지선다 — SSIT 황유상 교수 반도체 구조 기술 8~13강
        </p>
      </div>
    </div>
  )
}
