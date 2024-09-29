import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authReducer from './authSlice';

interface Record {
  id: number;
  title: string;
  description: string;
}

const recordsSlice = createSlice({
  name: "records",
  initialState: [] as Record[],
  reducers: {
    addRecord: (state, action: PayloadAction<Record>) => {
        state.push(action.payload);
    },
    updateRecord: (state, action: PayloadAction<Record>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  },
});

export const { addRecord, updateRecord } = recordsSlice.actions;
export const recordsReducer = recordsSlice.reducer;

const store = configureStore({
  reducer: {
    records: recordsReducer,
    auth: authReducer,
  },
});

export default store;