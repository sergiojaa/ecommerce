import axios, { AxiosError } from "axios";

const mobileRegex = /^5\d{8}$/;

type responseType = {
  error?: string;
  message?: string;
};

const changeUserNumber = async (mobileNumber: string) => {
  const res: responseType = {};

  if (!mobileRegex.test(mobileNumber)) {
    res.error = "   მობილური ნომრის არასწორი ფორმატი. ის უნდა დაიწყოს 5-ით და იყოს 9 ციფრი.";
    return res;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      "https://trulaila-api-production.up.railway.app/account/edit",
      {
        change: "mobile number",
        changeTo: mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    console.log(response)

    // Safely handle response.data
    res.message =
      typeof response.data === "string"
        ? response.data
        : response.data.message || "Mobile number updated successfully.";
  } catch (error) {
    const axiosError = error as AxiosError;

    // Safely extract error response
    if (axiosError.response && axiosError.response.data) {
      const responseData = axiosError.response.data as { message?: string };
      res.error = responseData.message || "An unexpected error occurred.";
    } else {
      res.error = "An error occurred while updating the mobile number.";
    }

    console.error("Error updating data:", axiosError.message);
  }

  return res;
};

export default changeUserNumber;
