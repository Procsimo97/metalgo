"use client";

import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "@/app/authSlice";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
});

  const onSubmit = (data: RegisterFormData) => {
    dispatch(login({ name: data.name, email: data.email }));
    router.push("/profile");
  };

  return (
    <div className="max-w-[400px] m-auto">
      <h2 className="text-xl font-semibold my-5">Регистрация</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="flex w-full rounded-full border border-yellow-500 py-1
                grow-0 flex-shrink bg-transparent px-5 focus:outline-none"
            type="text"
            placeholder="Имя"
            required
            {...register('name', { required: 'Имя обязательно для заполнения' })}

          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            className="flex w-full rounded-full border border-yellow-500 py-1
                grow-0 flex-shrink bg-transparent px-5 focus:outline-none"
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email обязателен для заполнения',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Введите корректный email',
              },
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            className="flex w-full rounded-full border border-yellow-500 py-1
              grow-0 flex-shrink bg-transparent px-5 focus:outline-none"
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: 'Пароль обязателен для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
        </div>

        <button
          className="hover:text-yellow-300 transition ease-in-out delay-100"
          type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}