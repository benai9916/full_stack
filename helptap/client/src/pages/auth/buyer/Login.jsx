import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// local
import LoginSignUpBox from "components/LoginSignUpBox";
import useFormValidate from "hooks/useFormValidate";
import LoadingHOC from "components/common/LoadingHOC";
import { login } from "store/slices/auth";
import { BUYER } from "constants";
import { useEffect } from "react";

const Login = (props) => {
  const { setLoading } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.auth);

  const handlerLogin = () => {
    let formData = { ...values, ["clientType"]: BUYER };
    delete formData.name;
    dispatch(login(formData));
  };
  const { values, errors, handleChange, handleSubmit } = useFormValidate(
    handlerLogin,
    true
  );

  useEffect(() => {
    setLoading(isLoading);
    if (!isError && data?.id) {
      localStorage.setItem('id', data?.id)
      navigate(`/buyer/${data?.id}`);
    }
  }, [isLoading, isError, data, values]);

  return (
    <LoginSignUpBox
      mode="login"
      values={values}
      errors={errors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default LoadingHOC(Login);
