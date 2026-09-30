export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
   email: string; 
   otp: string; 
   newPassword: string; 
  } 

  export interface GoogleLoginPayload {
  idToken: string;
}