import { registration, login, Logout } from './authApi';  // adjust according to your file structure
import { api } from '../api'; // Import the api instance

// Mock the `api` module
jest.mock('../api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('Auth API', () => {
  it('should register a user successfully', async () => {
    const mockCredentials = { username: 'testUser', password: 'password123' };
    const responseData = {data:{ message: 'User registered successfully' }};

    // Mock the post request for registration
    api.post.mockResolvedValue({ data: responseData, status: 200 });

    const response = await registration(mockCredentials);

    expect(response.data).toEqual(responseData);
    expect(response.status).toBe(200);
    expect(api.post).toHaveBeenCalledWith('/users', { data: mockCredentials });
  });

  it('should login a user successfully', async () => {
    const mockCredentials = { username: 'testUser', password: 'password123' };
    const responseData = { token: 'some-jwt-token' };

    // Mock the post request for login
   api.post.mockResolvedValue({ data: responseData, status: 200 });

    const response = await login(mockCredentials);

    expect(response.data).toEqual(responseData);
    expect(response.status).toBe(200);
    expect(api.post).toHaveBeenCalledWith('/users/login', { data: mockCredentials });
  });

  it('should logout a user successfully', async () => {
    const responseData = { message: 'Logged out successfully' };

    // Mock the post request for logout
   api.post.mockResolvedValue({ data: responseData, status: 200 });

    const response = await Logout();

    expect(response.data).toEqual(responseData);
    expect(response.status).toBe(200);
    expect(api.post).toHaveBeenCalledWith('/users/logout');
  });

  it('should handle registration failure', async () => {
    const mockCredentials = { username: 'testUser', password: 'password123' };
    const errorMessage = { error: 'Registration failed' };

    // Mock the post request for registration failure
   api.post.mockRejectedValue({ response: { data: errorMessage, status: 400 } });

    try {
      await registration(mockCredentials);
    } catch (error) {
      expect(error.response.data).toEqual(errorMessage);
      expect(error.response.status).toBe(400);
    }
  });

  it('should handle login failure', async () => {
    const mockCredentials = { username: 'testUser', password: 'password123' };
    const errorMessage = { error: 'Invalid credentials' };

    // Mock the post request for login failure
   api.post.mockRejectedValue({ response: { data: errorMessage, status: 401 } });

    try {
      await login(mockCredentials);
    } catch (error) {
      expect(error.response.data).toEqual(errorMessage);
      expect(error.response.status).toBe(401);
    }
  });
});
