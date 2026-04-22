import { useMemo, useState } from 'react'
import recipes from './data/recipes.json'
import RecipeCard from './components/RecipeCard.jsx'
import RecipeDetail from './components/RecipeDetail.jsx'

const STAGE_FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 1, label: 'Стадия 1' },
  { value: 2, label: 'Стадия 2' },
  { value: 3, label: 'Стадия 3' },
  { value: 0, label: 'Бонус' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const selected = useMemo(
    () => (selectedId ? recipes.find((r) => r.id === selectedId) : null),
    [selectedId],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return recipes.filter((r) => {
      const matchesStage = stage === 'all' || r.stage === stage
      const matchesQuery = !q || r.title.toLowerCase().includes(q)
      return matchesStage && matchesQuery
    })
  }, [query, stage])

  if (selected) {
    return <RecipeDetail recipe={selected} onBack={() => setSelectedId(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 pt-5 pb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Рецепты</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию..."
            inputMode="search"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
          <div className="mt-3 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar">
            {STAGE_FILTERS.map((f) => {
              const active = stage === f.value
              return (
                <button
                  key={String(f.value)}
                  onClick={() => setStage(f.value)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors ${
                    active
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 active:bg-gray-100'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 pb-10">
        <p className="text-sm text-gray-500 mb-3">
          Найдено: {filtered.length}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedId(recipe.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              Ничего не найдено
              {query && <> по запросу «{query}»</>}.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
