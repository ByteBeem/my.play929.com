import axios from 'axios';
import { toast } from 'react-toastify';


const url ="https://secure.play929.com/";

export const loginUser = async (email , password) => {
  const urlApi = `${url}/api/user/login`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        email ,
        password,
       
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' 
        },
      }
    ),
    {
      pending: "Logging you in...",
      success: {
        render({ data }) {
          if (data.status === 200) {
            console.log(data)
            const redirectLink = data.data.link;
            const message = data.data.message;
            

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return message || "Welcome back.";
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

          }
        
        
        return "Something went wrong.";
        
    }
  }
    }
  );
};

export const requestPasswordReset = async ({ email }) => {
  try {
    const response = await axios.post(
      `${url}/api/auth/forgot-password`,
      {
        email: email.toLowerCase().trim(), 
        
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' 
        },
        timeout: 10000, 
        withCredentials: true 
      }
    );

    
    return {
      success: true,
      message: response.data?.message || 'Password reset instructions sent'
    };
  } catch (error) {
   
    let errorMessage = 'Failed to process password reset request';
    
    if (error.response) {

      errorMessage = error.response.data?.message || 
                    getStandardErrorMessage(error.response.status);
    } else if (error.request) {
      
      errorMessage = 'Network error - please try again';
    }

    throw new Error(errorMessage);
  }
};

const getStandardErrorMessage = (statusCode) => {
  const messages = {
    400: 'Invalid request format',
    401: 'Authentication required',
    403: 'Action not allowed',
    404: 'Account not found', 
    429: 'Too many requests - please wait before trying again',
    500: 'Server error - please try again later'
  };

  return messages[statusCode] || 'Unable to process your request';
};

export const verifyCode = async (Email , code , token) => {
  const urlApi = `${url}/api/auth/VerifyCode`;

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
            const message = data.data.message;
            

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return message || "Correct , redirecting.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;

            if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
              return errorData.errors.join(", "); 
          }
      
          if (errorData?.error) {
              return errorData.error;
          }
          }

          return "Network error: Please check your internet connection.";
        },
      },
    }
  );
};


export const resendCode = async (Email , token) => {
  const urlApi = `${url}/api/auth/resend`;

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
      pending: "resending your code...",
      success: {
        render({ data }) {
          if (data.status === 200) {
           
            const message = data.data.message;
  

            return message || "Code resend , successfully.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;

            if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
              return errorData.errors.join(", "); 
          }
      
          if (errorData?.error) {
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
  const urlApi = `${url}/api/user/register`;


  return toast.promise(
    axios.post(
      urlApi,
      {
        Email: data.email,
        Surname: data.surname,
        FullNames: data.name,
        idNumber :data.idNumber,
        PhoneNumber: data.cellphone,
        Password: data.password,
        ConfirmPassword: data.confirmPassword,

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
            const message = data.data.message;

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return message || "Account Created.";
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


export const verifyMFA = async (Email , code , token) => {
  const urlApi = `${url}/api/auth/verifyMFA`;

  return toast.promise(
    axios.post(
      urlApi,
      {
        sid: token,
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
            const message = data.data.message;
            

            setTimeout(() => {
              window.location.href = redirectLink;
            }, 2000);

            return message || "Correct , redirecting.";
          }
          return "Unexpected success response.";
        },
      },
      error: {
        render({ data }) {
          if (data && data.response) {
            const { status, data: errorData } = data.response;

            if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
              return errorData.errors.join(", "); 
          }
      
          if (errorData?.error) {
              return errorData.error;
          }
          }

          return "Network error: Please check your internet connection.";
        },
      },
    }
  );
};