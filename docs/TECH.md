# Tech — VulnMap

## Стек
React 18 + TypeScript strict + Vite 5
Tailwind CSS 3
react-leaflet 4 + leaflet 1.9 (без API ключей)
Recharts 2
clsx
Node.js ESM / Express 4 (backend)
concurrently + tsx

## Зависимости (package.json)
dependencies:
  react: ^18.3.1
  react-dom: ^18.3.1
  react-leaflet: ^4.2.1
  leaflet: ^1.9.4
  recharts: ^2.12.7
  clsx: ^2.1.1
  express: ^4.19.2
  cors: ^2.8.5

devDependencies:
  typescript: ^5.4.5
  vite: ^5.2.0
  @vitejs/plugin-react: ^4.3.0
  tailwindcss: ^3.4.4
  autoprefixer: ^10.4.19
  postcss: ^8.4.38
  concurrently: ^8.2.2
  tsx: ^4.15.7
  @types/react: ^18.3.3
  @types/react-dom: ^18.3.0
  @types/leaflet: ^1.9.12
  @types/express: ^4.17.21
  @types/cors: ^2.8.17

## Scripts
"dev":          "vite"
"dev:server":   "node server/index.mjs"
"dev:all":      "concurrently \"npm run dev\" \"npm run dev:server\""
"build":        "tsc && vite build"
"typecheck":    "tsc --noEmit"
"lint":         "eslint src"
"check:phase1": "tsx scripts/phase1-check.ts"

## Порты
Frontend: 5173
Backend:  3001
Proxy: /api/* → http://localhost:3001

## Правила кода
- TypeScript strict, никаких any
- Только функциональные компоненты
- Все строки UI через src/data/ru.ts
- Tailwind только (никаких inline styles)
- Хуки для логики (не в компонентах)
- Один компонент = один файл

## Что запрещено в UI
- Слова: mock, demo, тест, заглушка
- Placeholder серые блоки
- Консольные ошибки
- Сломанные leaflet CSS импорты