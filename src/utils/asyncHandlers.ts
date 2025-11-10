import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { SerializedError } from '@reduxjs/toolkit';

export const DEFAULT_ERROR_MESSAGE = 'Произошла неизвестная ошибка';

export interface AsyncState {
  isLoading: boolean;
  error: string | null;
}

export const handlePending = <T extends AsyncState>(state: Draft<T>) => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilled = <T extends AsyncState>(state: Draft<T>) => {
  state.isLoading = false;
};

export const handleRejected = <T extends AsyncState>(
  state: Draft<T>,
  action: PayloadAction<unknown, string, unknown, SerializedError>
) => {
  state.isLoading = false;
  state.error = action.error.message || DEFAULT_ERROR_MESSAGE;
};
