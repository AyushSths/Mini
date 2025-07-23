export const ADMIN_CREDENTIALS = {
  email: "admin@demo.com",
  password: "admin123",
};

export const isLoggedIn = () => {
  return typeof window !== 'undefined' && localStorage.getItem("adminLoggedIn") === "true";
};

export const login = (email: string, password: string): boolean => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem("adminLoggedIn", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("adminLoggedIn");
};
