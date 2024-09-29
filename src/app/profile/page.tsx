'use client';

import RecordsList from "@/components/RecordsList";
import { useSelector, useDispatch } from 'react-redux';

import { logout } from "@/app/authSlice";
import Login from "@/components/Login";

export default function Home() {
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    return <Login/>;
  }
  const handleLogout = () => {
    dispatch(logout());
    alert('Вы вышли из системы');
  };

  return (
      <div className="flex ">
        <main className="flex flex-col gap-8 items-center mt-10 mx-auto sm:items-start w-full">
          <div className="flex justify-around w-full">
            <h1 className="text-2xl">Мой профиль</h1>
            <button onClick={handleLogout}
              className="hover:text-yellow-500 transition ease-in-out delay-100">
              Выйти из профиля
            </button>
          </div>

          <div className="flex flex-col self-center gap-2">
            <h2 className="text-base">{user.name}</h2>
            <h2 className="text-xs text-yellow-500">{user.email}</h2>
          </div>
          <RecordsList />
        </main>
      </div>
  );
}
