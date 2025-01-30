import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { checkTokenValidity } from '../utils/checkTokenValidity';


export type productType = {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

type ProductCardProps = {
  product: productType;
  loadingProduct: string | null; // Assumes loadingProduct is either a string (the ID of a product) or null
  setLoadingProduct: (id: string | null) => void
}

export default function ProductCard({ product, loadingProduct, setLoadingProduct }: ProductCardProps) {
  const router = useRouter()

  const addtocart = async (id: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenValidity = await checkTokenValidity(token)
      console.log(tokenValidity)

      if (!tokenValidity) {
        router.push('/login');
        return;
      }
    } else {
      return router.push('/login')
    }


    setLoadingProduct(id);

    const MIN_LOADING_TIME = 1000;
    const startTime = Date.now();

    axios
      .post(
        'http://localhost:3001/cart/add-to-cart',
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('Product added to cart:', res.data);
      })
      .catch((err) => {
        console.error('Error adding product to cart:', err);
      })
      .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        setTimeout(() => setLoadingProduct(null), remainingTime);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border w-[250px] p-4 rounded shadow  flex flex-col justify-between">
        <Link href={`/products/${product._id}`}>
          <div className="flex justify-center items-center">
            <img
              className="h-[200px] w-[200px] object-contain object-center rounded"
              src={product.image}
              alt={product.name}
            />
          </div>
          <h2 className="font-bold text-gray-500 text-[15px] mt-[0.5rem] w-full truncate overflow-hidden text-ellipsis">
            {product.name}
          </h2>
          <p className="text-sm  text-green-500 mt-[0.5rem] line-clamp-2">
            მარაგშია
          </p>
        </Link>
        <div className="flex items-center justify-between">
          {product.price !== 'ფასი შეთანხმებით' && <p className="font-semibold">{product.price} ₾</p>}
          {product.price === 'ფასი შეთანხმებით' && <p className="font-semibold text-xs">{product.price}</p>}
          <button
            onClick={() => addtocart(product._id)}
            className={`px-4 py-2 rounded bg-secondary ${loadingProduct === product._id ? 'opacity-50' : 'opacity-100'
              }`}
            disabled={loadingProduct === product._id}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-white text-xl cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
