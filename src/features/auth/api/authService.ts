

const BASE_URL = "https://dummyjson.com/auth";


export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number; // optional, default is 60
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  // You can add more fields if needed
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}



//  LOGIN
export const loginUserAPI = async (
  userData: LoginCredentials
): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid username or password");
  }

  const data: AuthResponse = await response.json();

  //  Store tokens and user data
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};

//  GET CURRENT USER
export const getCurrentUserAPI = async (): Promise<User> => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found. Please login again.");
  }

  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Session expired or failed to fetch user");
  }

  return response.json();
};

//  LOGOUT
export const logoutUserAPI = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// Optional: Helper to check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("accessToken");
};