import React, { SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
