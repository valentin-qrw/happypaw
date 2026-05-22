"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { PawPrint, ArrowLeft, Star, MessageCircle, Bell } from "lucide-react";
import Link from "next/link";

const perks = [
  { icon: <Star className="size-4 text-orange-400" />, text: "Персоналізовані рекомендації" },
  { icon: <MessageCircle className="size-4 text-orange-400" />, text: "Приватні повідомлення з власниками" },
  { icon: <Bell className="size-4 text-orange-400" />, text: "Відстеження статусу заявок та сповіщення" },
];

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FDFAF8] p-4">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[480px] rounded-full bg-orange-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-[380px] rounded-full bg-orange-50/80 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md space-y-7">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-700"
        >
          <ArrowLeft className="size-4" />
          Назад на головну
        </Link>

        <div className="text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-orange-500 shadow-md shadow-orange-200">
              <PawPrint className="size-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Приєднуйтесь до{" "}
            <span className="italic text-orange-500">PawPrint!</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Зареєструйтесь, щоб знайти свого ідеального пухнастого друга
          </p>
        </div>

        <Card className="border border-gray-100 shadow-xl shadow-gray-100/60">
          <CardContent className="p-6">
            <SignUp />
          </CardContent>
        </Card>

        <div className="rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-4">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Що ви отримаєте
          </p>
          <ul className="space-y-2.5">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  {p.icon}
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}