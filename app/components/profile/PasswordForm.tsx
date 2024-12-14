import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeLowVision } from '@fortawesome/free-solid-svg-icons/faEyeLowVision';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { checkTokenValidity } from '../utils/checkTokenValidity';
import axios from 'axios';

export default function PasswordForm() {
    const router = useRouter()
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [passwordError, setPasswordError] = useState<string>('')
    const [answer, setAnswer] = useState('')


    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ''
    })

    const [visibleIcons, setVisibleIcons] = useState<{ [key: string]: boolean }>({
        oldPassword: false,
        newPassword: false,
        repeatNewPassword: false,
    });

    const togglePasswordVisibility = (id: string) => {
        setVisibleIcons((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the current value for the specified id
        }));
    };

    const newPasswordValue = (name: string, value: string) => {
        // Update the newPassword state dynamically based on the name
        setPasswords((prevState) => {
            const updatedState = { ...prevState, [name]: value };

            // Check if the newPassword and repeatNewPassword match
            if (updatedState.newPassword !== updatedState.repeatNewPassword) {
                setPasswordError('ახალი პაროლები არ ემთხვევა ერთმანეთს'); // Passwords don't match
            } else if (!passwordRegex.test(updatedState.newPassword)) {
                setPasswordError('პაროლი უნდა შეიცავდეს მცირე და დიდ ასოებს, ციფრებს და სპეციალურ სიმბოლოებს.');

            } else {
                setPasswordError(''); // Passwords match
            }

            return updatedState;
        });
    };

    const updatePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const token = localStorage.getItem('token');
        if (!token || checkTokenValidity(token) !== true) {
            router.push('/login');
            return;
        }

        axios.patch('http://localhost:3001/auth/edit ',
            {
                change: "password",
                changeTo: passwords.newPassword,
                oldPassword: passwords.oldPassword
            },
            { headers: { Authorization: `Bearer ${token}` }, }
        ).then((res) => {
            setAnswer('პაროლი წარმატებით შეიცვალა')
            setTimeout(() => {
                setAnswer('')
            }, 3000)
        }).catch((err) => {
            console.log(err)
            setPasswordError('არასწორი პაროლია!')
        })
    }

    return (
        <div className='flex  md:justify-between items-center'>
            <div>
                <div className='mt-[1rem] mb-[1rem]'>
                    <h3>პაროლის შეცვლა</h3>

                </div>
                <div>

                    <form className='flex flex-col gap-6' >
                        <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
                            <input
                                className="flex-1 outline-none"
                                onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                                name="oldPassword"
                                placeholder="ძველი პაროლი"
                                type={!visibleIcons.oldPassword ? 'password' : 'text  '}
                                id=""
                            />
                            {visibleIcons.oldPassword ?
                                <FontAwesomeIcon
                                    onClick={() => togglePasswordVisibility('oldPassword')}
                                    icon={faEyeLowVision} // "Eye" icon when password is visible
                                    className="ml-2 text-gray-500 cursor-pointer"
                                    id="oldPassword" // Use the id to identify the field if needed
                                /> :
                                (
                                    <FontAwesomeIcon
                                        onClick={() => togglePasswordVisibility('oldPassword')}
                                        icon={faEye} // "Eye-slash" icon when password is hidden
                                        className="ml-2 text-gray-500 cursor-pointer"
                                        id='oldPassword'
                                    />
                                )
                            }
                        </div>



                        <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
                            <input
                                className="flex-1 outline-none"
                                onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                                name="newPassword"
                                placeholder="ახალი პაროლი"
                                type={!visibleIcons.newPassword ? 'password' : 'text  '}
                            />
                            {visibleIcons.newPassword ?
                                <FontAwesomeIcon
                                    onClick={() => togglePasswordVisibility('newPassword')}
                                    icon={faEyeLowVision} // "Eye" icon when password is visible
                                    className="ml-2 text-gray-500 cursor-pointer"
                                    id='repeatNewPassword'
                                /> :
                                (
                                    <FontAwesomeIcon
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                        icon={faEye} // "Eye-slash" icon when password is hidden
                                        className="ml-2 text-gray-500 cursor-pointer"
                                        id='newPassword'
                                    />
                                )
                            }
                        </div>

                        <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
                            <input
                                className="flex-1 outline-none"
                                onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                                name="repeatNewPassword"
                                placeholder="გაიმეორეთ ახალი პაროლი"
                                type={!visibleIcons.repeatNewPassword ? 'password' : 'text  '}
                                id="repeatNewPassword"
                            />
                            {visibleIcons.repeatNewPassword ?
                                <FontAwesomeIcon
                                    onClick={() => togglePasswordVisibility('repeatNewPassword')}
                                    icon={faEyeLowVision} // "Eye" icon when password is visible
                                    className="ml-2 text-gray-500 cursor-pointer"
                                    id="repeatNewPassword" // Use the id to identify the field if needed
                                /> :
                                (
                                    <FontAwesomeIcon
                                        onClick={() => togglePasswordVisibility('repeatNewPassword')}
                                        icon={faEye} // "Eye-slash" icon when password is hidden
                                        className="ml-2 text-gray-500 cursor-pointer"
                                        id='repeatNewPassword'
                                    />
                                )
                            }
                        </div>


                        <p className='text-red-600 text-xs'>{passwordError}</p>
                        <p className='text-green-600 text-xs'>{answer}</p>
                        <button
                            className='border bg-black text-white p-3 rounded-lg max-w-max'
                            onClick={updatePassword}
                            type="submit">
                            განაახლე პაროლი
                        </button>

                    </form>
                </div>

            </div>
        </div>
    )
}
