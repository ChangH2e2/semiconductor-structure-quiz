const EMOJI = (pct) => {
  if (pct >= 90) return '🏆'
  if (pct >= 70) return '🎉'
  if (pct >= 50) return '👍'
  return '📚'
}

const MSG = (pct) => {
  if (pct >= 90) return '완벽합니다! 기말 준비 완료!'
  if (pct >= 70) return '잘 하셨어요! 틀린 문제만 다시 복습해요.'
  if (pct >= 50) return '절반 통과! 조금 더 복습이 필요해요.'
  return '다시 도전해보세요! 해설을 잘 읽어보세요.'
}

export default function ResultScreen({ results, onRestart, onRestartSame }) {
  const { total, log } = results
  const correct = log.filter(l => l.correct).length
  const pct = log.length > 0 ? Math.round((correct / log.length) * 100) : 0
  const wrong = log.filter(l => !l.correct)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-2xl space-y-4 animate-fadeInUp">
        {/* 결과 카드 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-3">{EMOJI(pct)}</div>
          <h1 className="text-2xl font-bold text-blue-900 mb-1">퀴즈 완료!</h1>
          <p className="text-gray-500 text-sm mb-6">{MSG(pct)}</p>

          <div className="flex justify-center gap-8 mb-6">
            <div>
              <div className="text-4xl font-black text-blue-600">{correct}</div>
              <div className="text-xs text-gray-400 mt-1">정답</div>
            </div>
            <div>
              <div className="text-4xl font-black text-rose-400">{log.length - correct}</div>
              <div className="text-xs text-gray-400 mt-1">오답</div>
            </div>
            <div>
              <div className="text-4xl font-black text-gray-700">{total}</div>
              <div className="text-xs text-gray-400 mt-1">전체</div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-full h-4 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{pct}점 ({correct}/{log.length})</p>
        </div>

        {/* 오답 리뷰 */}
        {wrong.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>❌</span> 틀린 문제 복습 ({wrong.length}개)
            </h2>
            <div className="space-y-4">
              {wrong.map((item, i) => (
                <div key={i} className="border border-rose-100 rounded-2xl p-4 bg-rose-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">📝 4지선다</span>
                    <span className="text-xs text-gray-400">{item.q.lecture} · {item.q.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-2 leading-relaxed">{item.q.question}</p>
                  {item.userAnswer !== null && (
                    <div className="text-xs bg-white rounded-xl p-2 border border-rose-200 mb-2">
                      <span className="font-bold text-rose-500">내 답: </span>
                      <span className="text-gray-600">{item.q.options[item.userAnswer]}</span>
                    </div>
                  )}
                  <div className="text-xs bg-white rounded-xl p-3 border border-emerald-200 mb-2">
                    <span className="font-bold text-emerald-600">정답: </span>
                    <span className="text-gray-700">{item.q.options[item.q.answer]}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={onRestart}
            className="flex-1 py-4 bg-white border-2 border-blue-300 text-blue-600 rounded-2xl font-bold text-base shadow hover:bg-blue-50 active:scale-95 transition-all"
          >
            메인으로 🏠
          </button>
          {onRestartSame && (
            <button
              onClick={onRestartSame}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold text-base shadow hover:from-blue-700 hover:to-cyan-600 active:scale-95 transition-all"
            >
              같은 조건 다시 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
