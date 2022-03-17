import { types } from "../types/types";
import { firebase, googleAuth } from "../firebase/firebaseConfig";
import { finishLoadingAction, startLoadingAction } from "./ui";
export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoadingAction());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoadingAction());
      })
      .catch((e) => {
        dispatch(finishLoadingAction());
        console.log(e);
      });
  };
};

//register dispatch
export const startRegister = (email, password, name) => {
  //thunk permite ejecutar el dispatch para ejectuar las tareas asincronas
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};
export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};