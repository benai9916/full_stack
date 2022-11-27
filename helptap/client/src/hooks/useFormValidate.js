import { useState, useEffect } from "react";

const useFormValidate = (callback, login=false) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const validate = (val) => {
    let error = {}
    if(!val.email) {
      error.email = 'Email id required'
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val.email)) {
      error.email = 'Email id is invalid';
    }
    if(!login) {
      if(!val.name) {
        error.name = 'Name is required'
      }
    }
    return error
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useFormValidate;
