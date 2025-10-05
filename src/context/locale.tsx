import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'ru' | 'en' | 'fr' | 'es';

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const messages: Record<Locale, Record<string, string>> = {
  ru: {
    notFound.title: 'Страница не найдена',
    notFound.main: 'На главную',
    notFound.back: 'Назад',
    settings.title: 'Настройки',
    settings.language: 'Язык интерфейса',
    settings.account: 'Настройки аккаунта',
    settings.username: 'Имя пользователя',
    settings.avatar: 'Ссылка на аватар',
    settings.save: 'Сохранить',
    settings.logout: 'Выйти',
    settings.switch: 'Сменить аккаунт',
  },
  en: {
    notFound.title: 'Page not found',
    notFound.main: 'Home',
    notFound.back: 'Back',
    settings.title: 'Settings',
    settings.language: 'Interface language',
    settings.account: 'Account settings',
    settings.username: 'Username',
    settings.avatar: 'Avatar URL',
    settings.save: 'Save',
    settings.logout: 'Log out',
    settings.switch: 'Switch account',
  },
  fr: {
    notFound.title: 'Page introuvable',
    notFound.main: 'Accueil',
    notFound.back: 'Retour',
    settings.title: 'Paramètres',
    settings.language: "Langue de l'interface",
    settings.account: 'Paramètres du compte',
    settings.username: "Nom d'utilisateur",
    settings.avatar: "URL de l'avatar",
    settings.save: 'Enregistrer',
    settings.logout: 'Se déconnecter',
    settings.switch: 'Changer de compte',
  },
  es: {
    notFound.title: 'Página no encontrada',
    notFound.main: 'Inicio',
    notFound.back: 'Atrás',
    settings.title: 'Configuración',
    settings.language: 'Idioma de la interfaz',
    settings.account: 'Configuración de la cuenta',
    settings.username: 'Nombre de usuario',
    settings.avatar: 'URL del avatar',
    settings.save: 'Guardar',
    settings.logout: 'Cerrar sesión',
    settings.switch: 'Cambiar de cuenta',
  },
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('locale') as Locale) || 'ru');

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useMemo(() => {
    const dict = messages[locale];
    return (key: string) => dict[key] ?? key;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}