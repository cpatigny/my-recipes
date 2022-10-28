import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import '../../utils/firebase/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User, UserData } from '../../types/user';
import { AppThunk, RootState } from '../../app/store';

interface InitialState {
  userLoading: boolean;
  userDataLoading: boolean;
  user: User | null;
  userData: UserData | null;
  userDataError: string;
}

const initialState: InitialState = {
  userLoading: true,
  userDataLoading: true,
  user: null,
  userData: null,
  userDataError: '',
};

export const selectUserUid = (state: RootState) => {
  const { user } = state.user;
  if (user) return user.uid;
  return null;
};

export const fetchUserData = createAsyncThunk<UserData, undefined, { state: RootState }>('user/fetchUserData', async (arg, { getState }) => {
  const db = getDatabase();
  const uid = selectUserUid(getState());
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  return snapshot.val();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchSignInUserSuccess: (state, action: PayloadAction<User>) => {
      state.userLoading = false;
      state.user = action.payload;
    },
    noSignInUser: state => {
      state.userDataLoading = false;
      state.userData = null;
      state.userDataError = '';
    },
    signOut: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.userDataLoading = false;
      state.userData = action.payload;
      state.userDataError = '';
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userDataLoading = false;
      state.userData = null;
      state.userDataError = action.error.message || 'An error occurred';
    });
  },
});

export const { fetchSignInUserSuccess, noSignInUser, signOut } = userSlice.actions;

export const userObserver = (): AppThunk => dispatch => {
  const auth = getAuth();

  return onAuthStateChanged(auth, signedInUser => {
    // We serialized the object because redux shouldn't store non-serializable value
    const serializedUser = JSON.parse(JSON.stringify(signedInUser));

    dispatch(fetchSignInUserSuccess(serializedUser)); // null if no user signed in

    if (signedInUser) {
      dispatch(fetchUserData());
    } else {
      dispatch(noSignInUser());
    }
  });
};

export default userSlice.reducer;
