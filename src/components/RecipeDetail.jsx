import React, { useEffect } from 'react'

const STAGE_LABELS = {
  0: 'Бонус',
  1: 'Стадия 1',
  2: 'Стадия 2',
  3: 'Стадия 3',
}

const STAGE_STYLES = {
  0: 'bg-amber-100 text-amber-800',
  1: 'bg-emerald-100 text-emerald-800',
  2: 'bg-sky-100 text-sky-800',
  3: 'bg-violet-100 text-violet-800',
}

const INGREDIENT_LABELS = {
  eggs: 'Яйца',
  chicken: 'Курица',
  turkey: 'Индейка',
  beef: 'Говядина',
  fish: 'Рыба',
  cheese: 'Сыр',
  avocado: 'Авокадо',
  zucchini: 'Кабачок',
  cauliflower: 'Цветная капуста',
  broccoli: 'Брокколи',
  cabbage: 'Капуста',
  spinach: 'Шпинат',
  carrot: 'Морковь',
  peas: 'Горошек',
  beans: 'Бобовые',
  lentils: 'Чечевица',
  chickpeas: 'Нут',
  nuts: 'Орехи',
  almonds: 'Миндаль',
  seaweed: 'Водоросли',
  quinoa: 'Киноа',
  buckwheat: 'Гречка',
  chia: 'Чиа',
  flax: 'Лён',
  coconut: 'Кокос',
  herbs: 'Зелень',
  apple: 'Яблоки',
  vegetables: 'Овощи',
}

export default function RecipeDetail({ recipe, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [recipe.id])

  const stageLabel = STAGE_LABELS[recipe.stage]
  const stageStyle = STAGE_STYLES[recipe.stage] ?? 'bg-gray-100 text-gray-700'
  const ingredientLabel = INGREDIENT_LABELS[recipe.mainIngredient] ?? recipe.mainIngredient

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Назад"
            className="flex items-center gap-1.5 text-gray-700 active:text-gray-900 text-base font-medium -ml-1 px-1 py-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Назад
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 pb-12">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {recipe.title}
          </h1>
          {stageLabel && (
            <span className={`shrink-0 mt-1 text-[11px] font-medium px-2 py-1 rounded-full ${stageStyle}`}>
              {stageLabel}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          <span className="text-gray-400">Основа:</span> {ingredientLabel}
        </p>

        <div className="grid grid-cols-4 gap-2 text-center mb-6">
          <Stat label="ккал" value={recipe.calories} />
          <Stat label="Белки" value={`${recipe.protein}г`} />
          <Stat label="Жиры" value={`${recipe.fat}г`} />
          <Stat label="Углев." value={`${recipe.carbs}г`} />
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Ингредиенты</h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((item, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-gray-800 leading-snug">
                <span className="text-gray-300 mt-1.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Приготовление</h2>
          <ol className="space-y-3">
            {recipe.steps?.map((step, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-gray-800 leading-snug">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-lg py-2 px-1 border border-gray-100">
      <div className="text-base font-semibold text-gray-900 tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
