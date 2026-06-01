# Design — VulnMap (Enterprise BI для ЦБ РФ)

## Цвета риска
low:      bg:#22c55e light:#dcfce7 text:#166534
medium:   bg:#f59e0b light:#fef3c7 text:#92400e
high:     bg:#f97316 light:#ffedd5 text:#9a3412
critical: bg:#ef4444 light:#fee2e2 text:#991b1b

Пороги: low<41, medium<61, high<76, critical≥76

## Цвета групп риска
cluster0: bg:#6366f1 light:#e0e7ff  (Высокий риск)
cluster1: bg:#f43f5e light:#ffe4e6  (Пожилые)
cluster2: bg:#f59e0b light:#fef3c7  (Самоуверенные)

## Тренды
improving: #16a34a ↓  (зелёный)
worsening: #dc2626 ↑  (красный)
stable:    #94a3b8 →  (серый)

## Брендинг
primary:   #0f4c81
header-bg: #0f172a  (slate-900)
app-bg:    #f1f5f9  (slate-100)
card-bg:   #ffffff
border:    #e2e8f0

## Шапка (Header)
Левый блок:
  Логотип: синий квадрат с текстом "ФТЛ"
  Название: "VulnMap" font-bold text-white text-xl
  Подпись: "Надзорная аналитика | ФинТехЛаб СПбГУ"
           text-xs text-slate-400

Правый блок:
  "Исследование 2024–2025 | 15 000 респондентов"
  text-xs text-slate-400
  Кнопка "Экспорт отчёта" bg-blue-600

## Layout Desktop
[Header 64px]
[FilterBar 52px]
[Left 68% — Карта] [Right 32% — Drill-down]

## Компоненты
Card: bg-white rounded-xl shadow-sm border p-4
MetricCard: Card + большое число + подпись + тренд
RiskBadge: rounded-full px-2.5 py-0.5 text-xs font-semibold
FilterPill: неактивн→border slate / активн→bg primary
TrendArrow: ↑↓→ + % цветной
SectionTitle: text-xs uppercase tracking-widest text-slate-400

## Иконки сценариев
📞 Звонок из банка
📱 SMS-фишинг
💰 Инвестфрод
🏛️ Псевдо-госуслуги
🏖️ Курортный фрод
🌐 Онлайн-мошенничество

## Choropleth карта
Цвет полигона = riskLevel региона
Hover: белая обводка 2px + tooltip
Выбранный: синяя обводка 3px #0f4c81
Tooltip: название + индекс + стрелка тренда