// This service would handle actual authentication API calls
// For now, it's mocked in the AuthContext

export const authService = {
  async login(email: string, password: string) {
    // Mock API call
    return new Promise<{ success: boolean; user?: any; error?: string }>((resolve) => {
      setTimeout(() => {
        if (email === 'demo@palmtariffsim.com' && password === 'password') {
          resolve({
            success: true,
            user: {
              id: '1',
              email,
              name: 'Policy Analyst',
              role: 'analyst',
              organization: 'Ministry of Agriculture',
              createdAt: new Date().toISOString()
            }
          });
        } else {
          resolve({
            success: false,
            error: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  },

  async register(userData: any) {
    // Mock API call
    return new Promise<{ success: boolean; user?: any; error?: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
          }
        });
      }, 1000);
    });
  }
};