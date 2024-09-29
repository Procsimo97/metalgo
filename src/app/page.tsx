"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col gap-3 m-auto items-center justify-center">
      <h2 className="font-semibold">Добро пожаловать</h2>
      <Link href="/register">Ещё нет профиля? Зарегистрируйтесь</Link>
    </section>
  );
}