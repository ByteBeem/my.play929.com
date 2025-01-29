import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'https://play929-e6eecaaffjgfbpec.southafricanorth-01.azurewebsites.net';


export const loginUser = async (email, password) => {
  const urlApi = `${url}/api/Account/Login`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        email: email.toLowerCase(),
        password: password,
      },
      {
        withCredentials: true,
      }
    ),
    {
      pending: "Logging you in...",
      success: {
        render({ data }) {
          if (data.status === 200) {
            const redirectLink = data.data.link;

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return "Welcome back.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;

            if (status === 401) {
              return "Incorrect Email or Password.";
            } else if (status === 404) {
              return "The user could not be found.";
            } else if (status === 500) {
              return "Internal Server Error: Please try again later.";
            } else {
              return "An unexpected error occurred.";
            }
          }

          return "Network error: Please check your internet connection.";
        },
      },
    }
  );
};
