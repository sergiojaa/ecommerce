'use client'
import React, { useState } from 'react'
import CategoryDropDownMenu from '../CategoryDropDownMenu';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProductCreator() {
    const [image, setImage] = useState<File | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [selectedDescription, setSelectedDescription] = useState<string[]>([]);
    const [productPrice, setProductPrice] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(e.target.value)
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const formData = new FormData();
        if (!image) {
            return setError('გთხოვთ დაურთეთ ფოტო')
        }

        formData.append('singleFile', image);
        formData.append('name', productName);
        formData.append('description', selectedDescription.join(','));
        formData.append('price', productPrice);
        formData.append('category', selectedCategory);

        try {
            const response = await axios.post('http://localhost:3001/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setAnswer('File uploaded successfully')
            setTimeout(() => { setAnswer('') }, 3000)
        } catch (error: any) {
            if (error.response?.data) {
                console.log(error.response.data);
                setError('Error');
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const router = useRouter()

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/'); // Redirect to home after logout
    };

    return (
        <div className='flex-[2]'>
            <form className='flex gap-[50px] px-[50px] ' onSubmit={handleSubmit}>

                <div className='flex-[3]   flex flex-col gap-[50px]'>

                    <div className='flex justify-between'>
                        <div className='flex-1'>
                            <h1 className='font-bold text-md'>პროდუქციის დასახელება</h1>
                            <p className='text-gray-500 text-xs'>ჩაწერეთ პროდუქტის დასახელება (3-50 ასომდე)</p>
                        </div>
                        <div className='flex-[2] flex items-center'>
                            <input onChange={handleName} className='text-sm px-[5px] py-[10px] rounded-md w-[80%] border-[1px] border-solid border-gray-500' name='name' type="text" placeholder='პროდუქტის სახელი' />
                        </div>
                    </div>

                    {/* <CategoryList selectedDescription={selectedDescription} setSelectedDescription={setSelectedDescription} /> */}

                    <div className='flex'>
                        <div className='flex-1'>
                            <h1 className='font-bold text-md'>პროდუქციის ფოტო</h1>
                            <p className='text-gray-500 text-xs'>აირჩიეთ პროდუქტის ფოტოსურათი (jpg, jpeg, png ფორმატით)</p>
                        </div>

                        <div className='flex-[2] flex items-start justify-between'>

                            <input
                                id="file-upload"
                                className="hidden"
                                type="file"
                                onChange={handleFileChange}
                            />

                            <div>
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer border bg-blue-500 text-white px-4 py-[10px] rounded hover:bg-blue-600"
                                >
                                    ფაილის ატვირთვა
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="px-4 py-[8px] ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    წაშლა
                                </button>
                            </div>

                            {image && (
                                <div className="max-w-[300px]">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded"
                                        className="w-[300px] h-auto border rounded shadow-md"
                                    />

                                </div>
                            )}
                        </div>

                    </div>

                    <div className='flex'>
                        <div className='flex-1'>
                            <h1 className='font-bold text-md'>პროდუქციის კატეგორია</h1>
                            <p className='text-gray-500 text-xs'>ჩაწერეთ პროდუქტის კატეგორია</p>
                        </div>
                        <div className='flex-[2] flex items-center'>
                            <CategoryDropDownMenu
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex-1'>
                            <h1 className='font-bold text-md'>პროდუქციის ფასი</h1>
                            <p className='text-gray-500 text-xs'>ჩაწერეთ პროდუქტის ფასი</p>
                        </div>
                        <div className='flex-[2] flex items-center'>
                            <input onChange={handlePrice} className='text-sm px-[5px] py-[10px] rounded-md w-[80%] border-[1px] border-solid border-gray-500' name='name' type="number" placeholder='პროდუქტის ფასი' />
                        </div>
                    </div>


                    <div className='flex items-center justify-center w-full'>
                        <button className='bg-blue-500 tex-twhite rounded-md h-full px-[20px] py-[10px] text-white' type='submit'>შექმნა</button>
                    </div>

                    <p className='text-red-600'>{error}</p>
                    <p className='text-green-400'>{answer}</p>
                </div>
            </form>

        </div>



    )
}
