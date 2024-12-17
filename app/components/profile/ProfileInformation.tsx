import React, { useEffect, useState } from "react";
import changeUserNumber from "../utils/changeUserNumber";

type userDataType = {
  email: string;
  userName: string;
  mobileNumber: string;
};

export default function ProfileInformation({
  userData,
  setUserData
}: {
  userData: userDataType;
  setUserData: React.Dispatch<React.SetStateAction<userDataType>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [number, setNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setNumber(userData.mobileNumber)
  }, [userData.mobileNumber])

  const onEdit = () => {
    setIsEditing(!isEditing);
    setError(null); // Clear errors on edit
    setMessage(null); // Clear messages on edit
  };

  const onSubmit = async () => {
    setError(null);
    setMessage(null);

    const numberChange = await changeUserNumber(number);

    if (numberChange.error) {
      setError(numberChange.error);
    } else {
      setMessage(numberChange.message || "Mobile number updated successfully.");
      setIsEditing(false); // Exit edit mode on success

      // Update userData in the parent state
      setUserData((prev) => ({ ...prev, mobileNumber: number }));
    }
  };

  return (
    <>
      <div className="flex justify-between mt-[2rem] items-center">
        <div>
          <h3>მეილი</h3>
          <h4 className="text-[13px] mt-[0.5rem]">{userData.email}</h4>
        </div>
      </div>
      <hr className="w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px]" />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[15px]">სახელი, გვარი</h2>
          <h2 className="text-[13px] mt-[0.5rem]">{userData.userName}</h2>
        </div>
      </div>
      <hr className="w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px]" />

      {/* Mobile Number Section */}
      <div className="flex justify-between items-center">
        <div>
          <h3>მობილურის ნომერი</h3>
          <div className="flex flex-col items-start">
            {isEditing ? (
              <>
                {/* Input Field */}
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  className="border p-2"
                  type="text"
                  value={number}
                />
                {/* Submit Button */}
                <button
                  className="bg-black text-white p-2 mt-2"
                  onClick={onSubmit}
                >
                  განაახლე მობილურის ნომერი
                </button>
              </>
            ) : (
              <h4 className="mt-[0.5rem]">{number}</h4> // Display Updated Number
            )}
            {/* Display Message and Error */}
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        {/* Edit/Cancel Button */}
        <div>
          <h4
            onClick={onEdit}
            className="text-blue-500 cursor-pointer xl:mr-[20rem] mr-[2rem]"
          >
            {!isEditing ? "შეცვლა" : "გაუქმება"}
          </h4>
        </div>
      </div>
      <hr className="w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px]" />
    </>
  );
}
