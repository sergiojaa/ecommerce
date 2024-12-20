import React, { useState } from 'react'
import CategoryDropDownMenu from '../CategoryDropDownMenu';
import axios from 'axios';
import CategoryList from './DescriptionList';

export default function ProductCreator() {
    const [image, setImage] = useState<File | null>(null); // Store the image as a File
    const [productName, setProductName] = useState<string>('');
    const [selectedDescription, setSelectedDescription] = useState<string[]>([]);
    const [productPrice, setProductPrice] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const formData = new FormData();
        if (image) {
            formData.append('singleFile', image);
        }
        formData.append('name', productName);
        formData.append('description', selectedDescription[0]);
        formData.append('price', productPrice);
        // formData.append('category', selectedCategory.toString());

        try {
            const response = await axios.post('http://localhost:3001/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('File uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        // <div>
        //     <form className="flex items-center mt-6 justify-center gap-3 flex-col" onSubmit={handleSubmit}>
        //         <CategoryDropDownMenu
        //             selectedCategory={selectedCategory}
        //             setSelectedCategory={setSelectedCategory}
        //         />

        //         <label htmlFor="product-name">პროდუქციის სახელი</label>
        //         <input
        //             id="product-name"
        //             value={productName}
        //             onChange={(e) => setProductName(e.target.value)}
        //             placeholder="შეიყვანე პროდუქციის სახელი"
        //             className="border"
        //             type="text"
        //         />

        //         <label htmlFor="product-description">პროდუქციის აღწერა</label>
        //         <textarea
        //             id="product-description"
        //             value={productDescription}
        //             onChange={(e) => setProductDescription(e.target.value)}
        //             className="border w-[300px] h-[100px]"
        //             placeholder="ჩაწერე"
        //         />

        //         <label htmlFor="product-price">ფასი</label>
        //         <input
        //             id="product-price"
        //             value={productPrice}
        //             onChange={(e) => setProductPrice(e.target.value)}
        //             placeholder="პროდუქციის ფასი"
        //             className="border"
        //             type="text"
        //         />

        // <input
        //     id="file-upload"
        //     className="hidden"
        //     type="file"
        //     onChange={handleFileChange}
        // />
        // <label
        //     htmlFor="file-upload"
        //     className="cursor-pointer border bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        // >
        //     ფაილის ატვირთვა
        // </label>

        // {image && (
        //     <div className="mt-4">
        //         <h3 className="text-center">ატვირთული ფოტო</h3>
        //         <img
        //             src={URL.createObjectURL(image)}
        //             alt="Uploaded"
        //             className="w-[300px] h-auto border rounded shadow-md"
        //         />
        //         <button
        //             type="button"
        //             onClick={() => setImage(null)}
        //             className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        //         >
        //             წაშლა
        //         </button>
        //     </div>
        // )}

        //         <button type="submit" className="border w-[200px] text-white bg-red-400">
        //             დამატება
        //         </button>
        //     </form>
        // </div>

        <form className='flex gap-[50px] px-[50px] py-[50px]'>
            <div className='flex-[3] flex flex-col gap-[50px]'>

                <div className='flex justify-between'>
                    <div className='flex-1'>
                        <h1 className='font-bold text-md'>პროდუქციის დასახელება</h1>
                        <p className='text-gray-500 text-xs'>ჩაწერეთ პროდუქტის დასახელება (3-50 ასომდე)</p>
                    </div>
                    <div className='flex-[2] flex items-center'>
                        <input className='text-sm px-[5px] py-[10px] rounded-md w-[80%] border-[1px] border-solid border-gray-500' name='name' type="text" placeholder='პროდუქტის სახელი' />
                    </div>
                </div>

                <CategoryList selectedDescription={selectedDescription} setSelectedDescription={setSelectedDescription} />

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
            </div>
            <div className='flex-1 bg-red-900 h-screen'>
            </div>
        </form>
    )
}
