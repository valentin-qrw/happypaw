import {
  Award,
  Home,
  MessageCircle,
  PawPrint,
  Shield,
  Users,
  Star,
  Heart,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const features = [
  {
    icon: <PawPrint className="size-6 text-orange-500" />,
    bg: "bg-orange-50",
    title: "Розумний підбір",
    desc: "Наш алгоритм враховує ваш спосіб життя і вподобання, щоб показувати тварин, які справді можуть вам підійти.",
  },
  {
    icon: <Users className="size-6 text-blue-500" />,
    bg: "bg-blue-50",
    title: "Перевірені профілі",
    desc: "Профілі власників проходять перевірку, щоб ви могли безпечніше спілкуватися з іншими користувачами.",
  },
  {
    icon: <Shield className="size-6 text-green-500" />,
    bg: "bg-green-50",
    title: "Безпечно і надійно",
    desc: "Ми допомагаємо зробити процес прилаштування зрозумілим і безпечним для всіх учасників.",
  },
  {
    icon: <MessageCircle className="size-6 text-violet-500" />,
    bg: "bg-violet-50",
    title: "Пряме спілкування",
    desc: "Спілкуйтеся напряму з власниками або притулками, ставте питання та домовляйтеся про знайомство в одному місці.",
  },
  {
    icon: <Home className="size-6 text-indigo-500" />,
    bg: "bg-indigo-50",
    title: "Підтримка після прилаштування",
    desc: "Отримуйте корисні матеріали, поради з догляду та підтримку спільноти навіть після того, як тваринка знайде дім.",
  },
  {
    icon: <Award className="size-6 text-pink-500" />,
    bg: "bg-pink-50",
    title: "Історії успіху",
    desc: "Читайте теплі історії людей, які знайшли своїх улюбленців через HappyPaw.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF8] font-sans">

      {/* nav*/}
      <header className="sticky top-0 z-50 border-b border-orange-100/60 bg-[#FDFAF8]/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-[68px] items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
              <PawPrint className="size-5 text-white" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-gray-900">HappyPaw</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                Увійти
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-full bg-orange-500 px-5 shadow-sm hover:bg-orange-600">
                Почати
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="container mx-auto grid items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h1 className="mb-5 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
            Знайдіть свого ідеального{" "}
            <span className="italic text-orange-500">пухнастого друга</span>
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-500">
            Знаходьте тварин, які шукають люблячий дім. Приєднуйтеся до людей, які вже знайшли своїх вірних компаньйонів через HappyPaw.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/sign-in">
              <Button size="lg" className="rounded-full bg-orange-500 px-7 shadow-md hover:bg-orange-600">
                Почати прилаштування
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-orange-300 px-7 text-orange-600 hover:bg-orange-50"
              >
                Додати тварину
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="relative flex size-[340px] items-center justify-center rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-orange-100 md:size-[400px]">
            <span className="text-[160px] drop-shadow-xl">🐶</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Чому варто обрати HappyPaw?
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-500">
            Ми робимо шлях до прилаштування простішим, безпечнішим і приємнішим — від першого кліку до нового дому.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${f.bg}`}>
                  {f.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">{f.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-gray-500">{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-orange-500 py-24 text-white">
        <span className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[200px] opacity-[0.06]">
          🐾
        </span>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Готові знайти нового найкращого друга?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed opacity-90">
            Багато тварин чекають на люблячий дім. Іноді достатньо одного рішення, щоб змінити життя — ваше і їхнє.
          </p>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="rounded-full bg-white px-9 text-orange-500 shadow-lg hover:bg-orange-50 hover:shadow-xl"
            >
              Почати зараз
            </Button>
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-gray-950 py-14 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-xl bg-orange-500">
                  <PawPrint className="size-4 text-white" />
                </div>
                <span className="text-xl font-bold">HappyPaw</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                Поєднуємо люблячі сім’ї з тваринами, які шукають дім, крок за кроком.
              </p>
            </div>

            {/* links */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Для тих, хто шукає тварину</h3>
              <ul className="space-y-2.5">
                {[["Переглянути тварин", "/dashboard/discover"], ["Як це працює", "/how-it-works"], ["Гід із прилаштування", "/adoption-guide"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-sm text-gray-400 transition hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Для власників тварин</h3>
              <ul className="space-y-2.5">
                {[["Додати тварину", "/dashboard/add-pet"], ["Корисні матеріали", "/resources"], ["Історії успіху", "/success-stories"]].map(([l, h]) => (
                  <li key={l}><Link href={h} className="text-sm text-gray-400 transition hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/8 pt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} HappyPaw. Усі права захищено.
          </div>
        </div>
      </footer>

    </div>
  );
}