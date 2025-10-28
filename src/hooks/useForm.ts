import React, { useState } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (newValues?: T) => {
    setValues(newValues || initialValues);
  };

  return { values, setValues, handleChange, resetForm };
}
