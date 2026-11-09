import { useEffect, useState } from "react";
import {
  ADDRESS,
  BOOKING_URL,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  hours,
  openStatus,
  reviews,
  serviceGroups,
  visitSteps,
} from "./data";

const wrap = "mx-auto w-full max-w-[1100px] px-5 md:px-8";

const heroHand =
  "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1400";
const room =
  "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1400";

export default function App() {
  const [status, setStatus] = useState(() => openStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(openStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-line)]">
        <div className={`${wrap} flex items-center justify-between gap-4 py-4`}>
          <a href="#" className="t-1 font-semibold tracking-tight">
            MNJ Studio
          </a>
          <nav className="hidden items-center gap-5 text-[14px] text-[var(--color-muted)] sm:flex">
            <a href="#uslugi" className="hover:text-[var(--color-ink)]">
              Услуги
            </a>
            <a href="#kak" className="hover:text-[var(--color-ink)]">
              Как минава
            </a>
            <a href="#kontakt" className="hover:text-[var(--color-ink)]">
              Контакт
            </a>
          </nav>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-medium text-[var(--color-paper)] hover:opacity-90"
          >
            Запази час
          </a>
        </div>
      </header>

      <main>
        <section className={`${wrap} grid gap-10 py-12 md:grid-cols-2 md:items-center md:py-16`}>
          <div>
            <p className="t-label text-[var(--color-muted)]">Надежда 2 · София</p>
            <h1 className="t-3 mt-3 max-w-[18ch]">Маникюр и медицински педикюр без излишни думи.</h1>
            <p className="mt-4 max-w-[42ch] text-[var(--color-muted)]">
              Студио MNJ — гел, удължаване, медицински педикюр, PODOFIX и лазер при нужда. Записване онлайн или по телефона.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-[14px] font-medium text-white"
              >
                Запази в Studio24
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-line)] px-6 text-[14px] font-medium tabular"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-4 text-[13px] text-[var(--color-muted)]">{status.text}</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
            <img src={heroHand} alt="Маникюр" className="h-full w-full object-cover" />
          </div>
        </section>

        <section id="uslugi" className="border-t border-[var(--color-line)] py-14">
          <div className={wrap}>
            <h2 className="t-2">Услуги</h2>
            <div className="mt-8 space-y-10">
              {serviceGroups.map((group) => (
                <div key={group.id}>
                  <h3 className="t-1">{group.title}</h3>
                  {group.intro && (
                    <p className="mt-2 max-w-[50ch] text-[15px] text-[var(--color-muted)]">{group.intro}</p>
                  )}
                  <ul className="mt-4 divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.note && (
                            <p className="text-[14px] text-[var(--color-muted)]">{item.note}</p>
                          )}
                        </div>
                        <p className="shrink-0 text-[13px] text-[var(--color-muted)] tabular">
                          {item.time ?? group.timeFallback}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] py-14">
          <div className={`${wrap} grid gap-8 md:grid-cols-2 md:items-center`}>
            <div className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
              <img src={room} alt="Студио" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <h2 className="t-2" id="kak">
                Как минава посещението
              </h2>
              <ol className="mt-6 space-y-4">
                {visitSteps.map((step, i) => (
                  <li key={step.title} className="rounded-2xl border border-[var(--color-line)] p-4">
                    <p className="t-label text-[var(--color-muted)]">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 font-semibold">{step.title}</p>
                    <p className="mt-1 text-[14px] text-[var(--color-muted)]">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] py-14">
          <div className={wrap}>
            <h2 className="t-2">Какво казват клиентите</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {reviews.map((r) => (
                <blockquote key={r.text} className="rounded-2xl border border-[var(--color-line)] p-5 text-[15px]">
                  „{r.text}“
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="border-t border-[var(--color-line)] py-14">
          <div className={wrap}>
            <h2 className="t-2">Контакт</h2>
            <div className="mt-6 max-w-lg">
              <p className="text-[14px] text-[var(--color-muted)]">Адрес</p>
              <p className="mt-1 font-medium">{ADDRESS}</p>
              <p className="mt-4 text-[14px] text-[var(--color-muted)]">Телефон</p>
              <a href={PHONE_HREF} className="mt-1 block font-medium tabular hover:underline">
                {PHONE_DISPLAY}
              </a>
              <p className="mt-4 text-[14px] text-[var(--color-muted)]">Работно време</p>
              <ul className="mt-1 space-y-1 text-[14px]">
                {hours.map((h) => (
                  <li
                    key={h.label}
                    className="flex justify-between gap-4 border-b border-[var(--color-line)] py-1.5"
                  >
                    <span>{h.label}</span>
                    <span className="text-[var(--color-muted)] tabular">{h.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-paper)]"
                >
                  Запази час
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--color-line)] px-5 py-2.5 text-[13px] font-medium"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-line)] py-8 text-center text-[13px] text-[var(--color-muted)]">
        MNJ Studio · {ADDRESS}
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-line)] bg-[var(--color-paper)]/95 p-3 backdrop-blur md:hidden">
        <a
          href={PHONE_HREF}
          className="flex h-11 items-center justify-center rounded-full bg-[var(--color-ink)] text-[14px] font-medium text-[var(--color-paper)]"
        >
          Обади се · {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
