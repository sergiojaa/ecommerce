'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    axios
      .post("https://trulaila-api-production.up.railway.app/auth/sign-in", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data)
        router.push("/");
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen-minus-header">
      <div className="w-full sm:w-auto rounded-xl shadow-none sm:shadow-lg border-none sm:border-gray-200 px-10 py-[40px] flex flex-col gap-5">
        <h1 className="text-xl font-bold">ანგარიშზე შესვლა</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <p>ელ. ფოსტა</p>
            <input
              name="email"
              onChange={inputValue}
              value={user.email}
              type="text"
              placeholder="შეიყვანეთ ელ. ფოსტა"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"
            />
          </div>
          <div>
            <p>პაროლი</p>
            <input
              name="password"
              onChange={inputValue}
              value={user.password}
              type="password"
              placeholder="შეიყვანეთ პაროლი"
              className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"
            />
          </div>
          <button
            className="cursor-pointer text-white font-bold bg-secondary px-[16px] py-[14px] rounder-xl w-full sm:w-[396px]"
            type="submit"
          >
            შესვლა
          </button>
        </form>
        <div className="w-full sm:w-[396px]">
          {error && <p className="text-red-600 text-sm font-[300]">{error}</p>}
        </div>
        <Link href={'/registration'}>
          <p className="w-full text-right text-sm underline">არ გაქვთ ანგარიში?</p>
        </Link>
      </div>
    </div>
  );
}
