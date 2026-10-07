/* Данные модели проекта «Центр карьеры». Всё статическое: обновление подборки —
   задача скрипта, который забирает вакансии с «Работы России» и правит файлы
   в src/data. */

export type Direction =
  | 'Юриспруденция'
  | 'Экономика'
  | 'Менеджмент'
  | 'Туризм'
  | 'Фармация'
  | 'Логистика'
  | 'Информационные технологии'
  | 'Психология'
  | 'Управление персоналом'
  | 'Бухгалтерия'

export type AcademyId = 'law' | 'ect' | 'tur' | 'pharm' | 'itd' | 'medic'

export interface Academy {
  id: AcademyId
  short: string
  title: string
  note: string
}

export type Employment = 'Очная' | 'Удалённая' | 'Гибрид'
export type Experience = 'Без опыта' | '1–3 года' | '3+ года'

export interface Vacancy {
  id: string
  title: string
  company: string
  city: string
  salary: string
  posted: string
  tags: string[]
  direction: Direction
  academy: AcademyId
  employment: Employment
  experience: Experience
  url?: string
}

export interface Internship {
  id: string
  title: string
  company: string
  city: string
  period: string
  direction: Direction
  paid: boolean
  summary: string
  tags: string[]
}

export interface AmbassadorProgram {
  id: string
  company: string
  mark: string
  tagline: string
  suits: string
  does: string
  gives: string
  terms: string
  selection: string
  deadline?: string
  url: string
}

export interface CareerStep {
  level: string
  title: string
  salary: string
  fields: string
  roles: string
}

export interface TargetStep {
  title: string
  text: string
}

export interface NewsItem {
  date: string
  title: string
}

export interface DirectionStat {
  direction: string
  percent: number
}