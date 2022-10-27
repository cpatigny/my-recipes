import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import '../../utils/firebase/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const initialState = {
  userLoading: true,
  userDataLoading: true,
  user: null,
  userData: null,
  userDataError: '',
};

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (arg, { getState }) => {
  const state = getState();
  const db = getDatabase();
  const userRef = ref(db, `users/${state.user.user.uid}`);
  const snapshot = await get(userRef);
  return snapshot.val();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchSignInUserSuccess: (state, action) => {
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
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userDataLoading = false;
      state.userData = action.payload;
      state.userDataError = '';
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userDataLoading = false;
      state.userData = null;
      state.userDataError = action.error.message;
    });
  },
});

export const { fetchSignInUserSuccess, noSignInUser, signOut } = userSlice.actions;

export const userObserver = () => dispatch => {
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
