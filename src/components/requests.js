import axios from 'axios';
import { toast } from 'react-toastify';



const url ="http://myauthservice.azurewebsites.net";

export const loginUser = async (Email , token) => {
  const urlApi = `${url}/api/auth/login`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        email: Email,
       
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,  
        },
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
          if (data?.response) {
            const { status, data: errorData } = data.response;
        
            if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                return errorData.errors.join(", "); 
            }
        
            if (errorData?.error) {
                return errorData.error;
            }
        
        
        return "Something went wrong.";
        
      
      }
    }
  }
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
  const urlApi = `${url}/api/auth/register`;


  return toast.promise(
    axios.post(
      urlApi,
      {
        email: data.email,
        LastName : data.surname,
        FirstName: data.name,
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
          if (data?.response) {
            const { status, data: errorData } = data.response;
        
            if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                return errorData.errors.join(", "); 
            }
        
            if (errorData?.error) {
                return errorData.error;
            }
        
        
        return "Something went wrong.";
        
      
      }
      
          return "Network error: Please check your internet connection.";
        },
      },      
    }
  );
};