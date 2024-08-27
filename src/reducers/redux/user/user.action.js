import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../config/config";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${config.BACKEND_URL}/getUsers`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
