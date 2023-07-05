import { Reducer } from "react";

interface SelectedFileState {
  file: File | null;
}

type SelectedFileAction = { type: "SET_SELECTED_FILE"; payload: File | null };

const selectedFileReducer: Reducer<SelectedFileState, SelectedFileAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_SELECTED_FILE":
      return { ...state, file: action.payload };
    default:
      return state;
  }
};

export default selectedFileReducer;
