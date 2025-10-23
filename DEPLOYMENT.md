# 🚀 Инструкция по деплою на GitHub Pages

## ✅ Что было исправлено

1. **Настроен автоматический деплой** - теперь при push на ветку `main` или `cursor/fix-typescript-rendering-on-github-591a` происходит автоматическая сборка и деплой
2. **Добавлены переменные окружения** - Supabase настройки теперь передаются в процесс сборки
3. **Создан `.env.example`** - для удобства настройки
4. **Обновлен `.gitignore`** - чтобы не коммитить `.env` файл

## 📋 Что нужно сделать

### 1. Запуш изменения

```bash
git add .
git commit -m "Fix GitHub Pages deployment - add build workflow"
git push
```

### 2. Проверить GitHub Pages настройки

Зайди в настройки репозитория на GitHub:
- Settings → Pages
- Source должен быть выбран: **GitHub Actions**

### 3. (Опционально) Добавить секреты в GitHub

Если хочешь скрыть Supabase ключи из workflow:

1. Иди в Settings → Secrets and variables → Actions
2. Добавь следующие секреты:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

(Если не добавишь, будут использоваться дефолтные значения из workflow файла)

## 🔧 Локальная сборка

Для тестирования локально:

```bash
# Установить зависимости
npm install

# Собрать проект
npm run build

# Превью собранного сайта
npm run preview
```

## 📁 Структура деплоя

- **Исходники**: `/src/` - TypeScript/React код
- **Сборка**: `/dist/` - готовые HTML/CSS/JS файлы (создается при сборке)
- **Публичные файлы**: `/public/` - копируются в `/dist/` при сборке
- **GitHub Actions**: `.github/workflows/deploy.yml` - автоматическая сборка и деплой

## 🎯 Как это работает

1. Ты пушишь код на GitHub
2. GitHub Actions автоматически:
   - Устанавливает зависимости (`npm ci`)
   - Собирает TypeScript в JavaScript (`npm run build`)
   - Деплоит папку `dist/` на GitHub Pages
3. Сайт доступен по адресу: **https://aetherium.khos.xyz**

## ❗ Важно

- GitHub Pages работает только со **статическими файлами** (HTML/CSS/JS)
- TypeScript **НЕ работает** напрямую в браузере, нужна сборка
- Vite собирает все в оптимизированные JavaScript файлы
- Файл `.nojekyll` нужен чтобы GitHub Pages не игнорировал файлы начинающиеся с `_`

## 🐛 Если белый экран

1. Открой консоль браузера (F12) и посмотри ошибки
2. Проверь что GitHub Actions workflow прошел успешно
3. Проверь что в Settings → Pages выбран источник "GitHub Actions"
4. Проверь что CNAME файл содержит правильный домен

---

**Теперь все должно работать!** 🎉
