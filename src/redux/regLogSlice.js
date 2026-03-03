import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

const apiUrl = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
  "tasks/login",
  async (fromLogin, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromLogin.data),
      });
      const data = await response.json();
      console.log(response.ok);

      if (response.ok) {
        fromLogin.navigate("/");
        localStorage.setItem("token", data.token);
      } else {
        console.log("Ошибка: ", data.message);
        return thunkAPI.rejectWithValue("Ошибка");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const registration = createAsyncThunk(
  "tasks/registration",
  async (regData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      });
      const data = await response.json();
      if (!response.ok) {
        // console.log(data.message);

        return thunkAPI.rejectWithValue("Ошибка");
      } else {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const regLogSlice = createSlice({
  name: "regLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("Всё гуд");
      })
      .addCase(login.rejected, (state, action) => {
        alert(action.payload);
      });
    builder
      .addCase(registration.fulfilled, (state, action) => {
        alert("Вы успешно зарегистрировались. Теперь нужно залогиниться");
      })
      .addCase(registration.rejected, (state, action) => {
        console.log(action);

        alert(action.payload);
      });
  },
});

export default regLogSlice.reducer;
