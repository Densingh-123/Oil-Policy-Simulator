export const validateSimulationParams = (tariff: number, shock: string): string | null => {
  if (tariff < 0 || tariff > 100) {
    return 'Tariff rate must be between 0% and 100%';
  }
  
  if (!shock || shock.trim() === '') {
    return 'Please select a shock event scenario';
  }
  
  return null;
};

export const validateUserRegistration = (userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): string | null => {
  if (!userData.name || userData.name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!userData.password || userData.password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  if (userData.password !== userData.confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};