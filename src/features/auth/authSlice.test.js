import authReducer, {
  loginRequest,
  registrationRequest,
  logoutRequest,
  success,
  failure,
} from './authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: false,
  };

  it('should handle loginRequest', () => {
    const action = loginRequest();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      loading: true,
      error: false,
    });
  });

  it('should handle registrationRequest', () => {
    const action = registrationRequest();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      loading: true,
      error: false,
    });
  });

  it('should handle logoutRequest', () => {
    const action = logoutRequest();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      loading: true,
      error: false,
    });
  });

  it('should handle success', () => {
    const action = success({ id: 1, name: 'John Doe' });
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      user: { id: 1, name: 'John Doe' },
      loading: false,
      error: false,
    });
  });

  it('should handle failure', () => {
    const action = failure('Error message');
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      loading: false,
      error: 'Error message',
    });
  });
});
