import React from 'react'
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

export default function RecipeCard({ recipe, onClick }) {
  const stageLabel = STAGE_LABELS[recipe.stage]
  const stageStyle = STAGE_STYLES[recipe.stage] ?? 'bg-gray-100 text-gray-700'
  const ingredientLabel = INGREDIENT_LABELS[recipe.mainIngredient] ?? recipe.mainIngredient

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 active:scale-[0.99] active:bg-gray-50 transition-transform focus:outline-none focus:ring-2 focus:ring-gray-900/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
            {recipe.title}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5 truncate">
            <span className="text-gray-400">Основа:</span> {ingredientLabel}
          </p>
        </div>
        {stageLabel && (
          <span className={`shrink-0 text-[11px] font-medium px-2 py-1 rounded-full ${stageStyle}`}>
            {stageLabel}
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <Stat label="ккал" value={recipe.calories} />
        <Stat label="Белки" value={`${recipe.protein}г`} />
        <Stat label="Жиры" value={`${recipe.fat}г`} />
        <Stat label="Углев." value={`${recipe.carbs}г`} />
      </div>
    </button>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg py-2 px-1">
      <div className="text-sm font-semibold text-gray-900 tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
