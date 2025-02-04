import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'https://play929-e6eecaaffjgfbpec.southafricanorth-01.azurewebsites.net';

// const url ="http://localhost:5124";

export const loginUser = async (Email) => {
  const urlApi = `${url}/api/Account/Login`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        email: Email,
       
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

            if (errorData && errorData.error) {
              return errorData.error; 
            }
          }

          return "Network error: Please check your internet connection.";
        },
      },
    }
  );
};


export const verifyCode = async (Email , code , token) => {
  const urlApi = `${url}/api/Account/VerifyCode`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        email: Email,
        code,
      },
      {
        withCredentials: true,  
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    ),
    {
      pending: "Verifying your code...",
      success: {
        render({ data }) {
          if (data.status === 200) {
            const redirectLink = data.data.link;

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return "Correct , redirecting.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;

            if (errorData && errorData.error) {
              return errorData.error; 
            }
          }

          return "Network error: Please check your internet connection.";
        },
      },
    }
  );
};

// create account

export const CreateAccount = async (data) => {
  const urlApi = `${url}/api/Account/CreateAccount`;


  return toast.promise(
    axios.post(
      urlApi,
      {
        email: data.email,
        Surname : data.surname,
        Name: data.name,
        country :data.country

      },
      {
        withCredentials: true,
      }
    ),
    {
      pending: "Creating account...",
      success: {
        render({ data }) {
          if (data.status === 200) {
            const redirectLink = data.data.link;

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return "Account Created.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;
      
            // If API sends a specific error message, use it
            if (errorData && errorData.error) {
              return errorData.error; 
            }

         
        if (status === 400 && errorData.errors) {
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => messages.join(" ")) 
            .join(" "); 
          return validationErrors;
        }
      
          }
      
          return "Network error: Please check your internet connection.";
        },
      },      
    }
  );
};