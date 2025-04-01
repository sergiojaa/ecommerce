import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

type RegexType = {
    emailRegex: RegExp;
    passwordRegex: RegExp;
    mobileRegex: RegExp;
};

type UserType = {
    email: string;
    userName: string;
    mobileNumber: string;
    password: string;
};

type SetErrorType = React.Dispatch<React.SetStateAction<string>>;
type SetUserType = React.Dispatch<React.SetStateAction<UserType>>;

type RegistrationFormProps = {
    regex: RegexType;
    error: string;
    setError: SetErrorType;
    user: UserType;
    setUser: SetUserType;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    regex,
    error,
    setError,
    user,
    setUser,
}) => {
    const router = useRouter()

    const { emailRegex, passwordRegex, mobileRegex } = regex;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value // Dynamically update the correct field
        }));

        if (name === "email" && !emailRegex.test(value)) {
            setError("შეიყვანეთ სწორი ელ. ფოსტა.");
        } else if (name === "password" && !passwordRegex.test(value)) {
            setError("პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, მინიმუმ 1 ციფრსა და ასოს და ერთ განსაკუთრებულ სიმბოლოს.");
        } else if (name === 'mobileNumber' && !mobileRegex.test(value)) {
            setError('შეიყვანეთ ვალიდური ტელეფონის ნომერი')
        } else {
            setError(""); // Clear the error when input is valid
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {


        e.preventDefault(); // Prevent form submission from reloading the page

        console.log(user.password.length)

        if (!emailRegex.test(user.email)) {
            setError("Invalid email format.");
        } else if (!passwordRegex.test(user.password)) {
            setError("Password is not strong enough.");
        } else {
            setError("");
        }

        if (error === '') {
            axios.post("http://localhost:3001/auth/sign-up", {
                email: user.email,
                username: user.userName,
                mobileNumber: user.mobileNumber,
                password: user.password
            })
                .then((res) => {
                    router.push('/login')
                    console.log(res)
                }).catch((err) => {
                    setError(err.response.data.message)
                })
        }
    };

    return (
        <div className="flex justify-center flex-col items-center h-screen-minus-header">
            <div className="w-full sm:w-auto rounded-xl shadow-none sm:shadow-lg border-none sm:border-gray-200 px-10 py-[40px] flex flex-col gap-5">
                <h1 className="text-xl font-bold">რეგისტრაცია</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <p>მომხმარებლის სახელი</p>
                        <input
                            name="userName"
                            onChange={handleInputChange}
                            value={user.userName}
                            type="text"
                            placeholder="შეიყვანეთ სახელი და გვარი"
                            className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"

                        />
                    </div>
                    <div>
                        <p>ელ. ფოსტა</p>
                        <input
                            name="email"
                            onChange={handleInputChange}
                            value={user.email}
                            type="text"
                            placeholder="შეიყვანეთ ელ. ფოსტა"
                            className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"

                        />
                    </div>
                    <div>
                        <p>მობილურის ნომერი</p>
                        <input
                            name="mobileNumber"
                            onChange={handleInputChange}
                            value={user.mobileNumber}
                            type="text  "
                            placeholder="შეიყვანეთ ნომერი"
                            className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"

                        />
                    </div>

                    <div>
                        <p>პაროლი</p>
                        <input
                            name="password"
                            onChange={handleInputChange}
                            value={user.password}
                            type="password"
                            placeholder="შეიყვანეთ პაროლი"
                            className="border-solid border-2 border-[D0D5DD] px-[16px] py-[10px] rounder-xl w-full sm:w-[396px] mt-[3px]"

                        />
                    </div>
                    <button
                        className="cursor-pointer text-white font-bold bg-secondary px-[16px] py-[12px] rounder-xl w-full sm:w-[396px]"

                        type="submit">რეგისტრაცია</button>
                </form>
                <div className="w-full sm:w-[396px]">
                    {error && <p className="text-red-600 text-sm font-[300]">{error}</p>} {/* Display error message */}
                </div>
                <Link className="w-full text-right text-sm underline" href={'/login'}>უკვე გაქვთ ანგარიში?</Link>
            </div>
        </div>
    )
}

export default RegistrationForm;