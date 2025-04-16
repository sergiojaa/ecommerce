import React from 'react';
export default function LeftSide({
    products,
    loading,
    loadingProductId,
    removeItem,
    handleQuantityChange
}: {
    products: CartItem[];
    loading: boolean;
    loadingProductId: string | null;
    removeItem: (productId: string, typeId: string | undefined) => void;
    handleQuantityChange: (
        productId: string,
        typeId: string | undefined,
        operation: "increment" | "decrement"
    ) => void;
}) {
    const getCartItemKey = (product: CartItem) => {
        return `${product.product._id}-${product.typeId || "default"}`;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex-[2]">
            <div className="flex flex-col w-full h-full overflow-scroll gap-[25px]">
                {products.map((product) => (
                    <div key={getCartItemKey(product)} className="px-4 pt-[10px] pb-[10px] rounded-xl md:shadow-md border md:border-gray-200 flex justify-between items-center">

                        <img className="w-[100px] h-[100px]" src={product.product.image} alt={product.product.name} />

                        <div className="flex flex-col items-start xl:flex-row w-full p-3">
                            <div className="flex flex-col">
                                <h1 className="">{product.product.name}</h1>
                                {product.typeName && (
                                    <span className="text-sm text-gray-600">ტიპი: {product.typeName}</span>
                                )}
                            </div>

                            <div className="flex items-center justify-start gap-5 w-full md:ml-6">

                                <div className="flex justify-center gap-5 border-solid border-[1px] px-[13px] py-[5px] rounded-2xl">
                                    <button
                                        onClick={() => handleQuantityChange(product.product._id, product.typeId, "decrement")}
                                        className="cursor-pointer">
                                        -
                                    </button>
                                    <p>{product.quantity}</p>
                                    <button
                                        onClick={() => handleQuantityChange(product.product._id, product.typeId, "increment")}
                                        className="cursor-pointer">
                                        +
                                    </button>
                                </div>


                            </div>
                        </div>

                        <button className="scale-125" onClick={() => removeItem(product.product._id, product.typeId)} disabled={loadingProductId === product.product._id}>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.75H2.33333H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.33398 3.74992V2.41659C4.33398 2.06296 4.47446 1.72382 4.72451 1.47378C4.97456 1.22373 5.3137 1.08325 5.66732 1.08325H8.33398C8.68761 1.08325 9.02674 1.22373 9.27679 1.47378C9.52684 1.72382 9.66732 2.06296 9.66732 2.41659V3.74992M11.6673 3.74992V13.0833C11.6673 13.4369 11.5268 13.776 11.2768 14.0261C11.0267 14.2761 10.6876 14.4166 10.334 14.4166H3.66732C3.3137 14.4166 2.97456 14.2761 2.72451 14.0261C2.47446 13.776 2.33398 13.4369 2.33398 13.0833V3.74992H11.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
