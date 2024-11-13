import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface Details {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  details: Details[] | any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

type AsyncThunkConfig = {
  state: RootState;
};

const user = JSON.parse(localStorage.getItem('user') || '{}');

// const API_URL = 'https://mern-auth-practice-backend.onrender.com/api/users';
const API_URL = 'http://localhost:5001/api/users';

const initialState: AuthState = {
  user: user ? user : null,
  details: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// register
export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      name: string | null;
      email: string | null;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(API_URL, userData);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login
export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + '/login', userData);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login google
export const loginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (
    userData: { name: string | null; email: string | null; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(API_URL + '/google', userData);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// user details
export const userDetails = createAsyncThunk<[], string, AsyncThunkConfig>(
  'auth/userDetails',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(API_URL + '/me', config);

      return response.data;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

// delete user
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.delete(API_URL + `/${userId}`);

      return response.data;
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.details = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(userDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.details = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.details = [];
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.details = [];
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
