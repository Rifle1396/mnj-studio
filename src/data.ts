export const BOOKING_URL = "https://studio24.bg/mnj-studio-s1171";
export const FACEBOOK_URL = "https://www.facebook.com/MNJ.STUDIO/";
export const PHONE_DISPLAY = "+359 88 827 9999";
export const PHONE_HREF = "tel:+359888279999";
export const ADDRESS = "ул. Свети Никола Нови 8, ж.к. Надежда 2, София";

export type Service = {
  name: string;
  note?: string;
  time?: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  intro?: string;
  featured?: boolean;
  timeFallback: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "ruce",
    title: "Нокти на ръцете",
    timeFallback: "",
    items: [
      { name: "Маникюр с гел лак", note: "Почистване, оформяне, гел лак.", time: "1 ч 45 мин – 1 ч 55 мин" },
      { name: "Маникюр с гел лак и укрепваща база", note: "Витаминна база, която укрепва ноктите.", time: "2 ч 15 мин – 2 ч 30 мин" },
      { name: "Френски маникюр с гел лак", time: "2 ч – 2 ч 15 мин" },
      { name: "Изграждане с акригел", note: "Удължаване на нокти.", time: "2 ч 30 мин – 3 ч" },
      { name: "Изграждане с гел и гел лак", note: "Удължаване на нокти.", time: "3 ч – 3 ч 30 мин" },
      { name: "Поправка на счупен нокът", time: "20 мин – 30 мин" },
      { name: "Сваляне на гел лак", time: "30 мин – 1 ч 30 мин" },
    ],
  },
  {
    id: "pedikyur",
    title: "Педикюр с лак",
    timeFallback: "",
    items: [
      { name: "Педикюр с гел лак", time: "2 ч – 2 ч 15 мин" },
      { name: "СПА педикюр с гел лак", time: "2 ч 35 мин – 2 ч 45 мин" },
      { name: "Маникюр и педикюр с гел лак", note: "И двете в една визита.", time: "3 ч 45 мин – 4 ч" },
    ],
  },
  {
    id: "medicinski",
    title: "Медицински и терапевтичен педикюр",
    intro: "Врастнали нокти, гъбички, напукани пети. Материалите са еднократни, инструментите са стерилни.",
    featured: true,
    timeFallback: "времето се уточнява при записване",
    items: [
      { name: "Медицински педикюр", note: "За напукани пети, мазоли и задебелени нокти." },
      { name: "Медицински педикюр с кюрета", note: "За проблемна зона." },
      { name: "Обработка на гъбичен нокът", note: "Педикюр и удължаване с антигъбичен гел." },
      { name: "PODOFIX", note: "За врастнал нокът." },
      { name: "Лазерно лечение на гъбички", note: "Броят процедури зависи от случая." },
    ],
  },
  {
    id: "lice",
    title: "Мигли, лице и кожа",
    timeFallback: "времето се казва при записване",
    items: [
      { name: "Мигли" },
      { name: "Микропигментация" },
      { name: "Лазерна епилация" },
      { name: "Процедури за лице" },
    ],
  },
];

export const visitSteps = [
  { title: "Записваш час", text: "Онлайн в Studio24 или по телефона." },
  { title: "Казваш какво искаш", text: "Показваш ноктите си и казваш какво те притеснява." },
  { title: "Процедурата", text: "От 20 минути за поправка до 3 ч 30 мин за изграждане." },
  { title: "Следващият път", text: "Ако е нужно повторно посещение, го уговаряме на място." },
];

export const reviews = [
  { text: "Винаги най-добрите, вие сте вълшебници!" },
  { text: "Винаги точни и безупречно обслужване." },
];

export const hours = [
  { label: "Понеделник", days: [1], text: "Почивен ден" },
  { label: "Вторник – Петък", days: [2, 3, 4, 5], text: "10:00 – 20:30" },
  { label: "Събота – Неделя", days: [6, 0], text: "08:00 – 19:00" },
];

const schedule: Record<number, [number, number] | null> = {
  0: [8 * 60, 19 * 60],
  1: null,
  2: [10 * 60, 20 * 60 + 30],
  3: [10 * 60, 20 * 60 + 30],
  4: [10 * 60, 20 * 60 + 30],
  5: [10 * 60, 20 * 60 + 30],
  6: [8 * 60, 19 * 60],
};

const fmt = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function sofiaNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Sofia",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    day: map[get("weekday")] ?? 0,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function openStatus(): { open: boolean; text: string } {
  const { day, minutes } = sofiaNow();
  const today = schedule[day];
  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true, text: `Отворено сега, до ${fmt(today[1])}` };
  }
  if (today && minutes < today[0]) {
    return { open: false, text: `Затворено. Отваряме днес в ${fmt(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const s = schedule[d];
    if (s) {
      return {
        open: false,
        text: i === 1 ? `Затворено. Отваряме утре в ${fmt(s[0])}` : `Затворено. Отваряме във ${dayName(d)} в ${fmt(s[0])}`,
      };
    }
  }
  return { open: false, text: "Затворено" };
}

function dayName(d: number) {
  return ["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"][d];
}
