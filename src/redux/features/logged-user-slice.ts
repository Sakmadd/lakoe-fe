import { UserType } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  value?: UserType;
}

const initialState: AuthState = {
  value: undefined,
};

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setLoggeduser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
    unSetLoggedUser: (state) => {
      state.value = undefined;
    },
  },
});

export const { setLoggeduser, unSetLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
