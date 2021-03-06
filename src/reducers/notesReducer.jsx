import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdate:
      return {
        ...state,

        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.notesFinishLoading:
      return {
        ...state,
        loading: false,
      };

    case types.noteSaveStartLoading:
      return {
        ...state,

        saveNoteLoad: true,
      };

    case types.noteSaveFinishLoading:
      return {
        ...state,

        saveNoteLoad: false,
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notesLogoutCleaning: {
      return {
        ...state,
        notes: [],
        active: null,
        loading: false,
        saveNoteLoad: false,
      };
    }
    default:
      return state;
  }
};
