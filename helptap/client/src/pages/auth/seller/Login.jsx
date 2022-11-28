import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// local
import LoginSignUpBox from "components/LoginSignUpBox";
import useFormValidate from "hooks/useFormValidate";
import LoadingHOC from "components/common/LoadingHOC";
import { login } from "store/slices/auth";
import { SELLER } from "constants";
import { useEffect } from "react";

const Login = (props) => {
  const { setLoading } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data, message } = useSelector((state) => state.auth);

  const handlerLogin = () => {
    let formData = { ...values, ["clientType"]: SELLER };
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
      navigate(`/seller/${data?.id}`);
    }
  }, [isLoading, isError, data]);
  return (
    <>
      <LoginSignUpBox
        mode="login"
        values={values}
        errors={errors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
};

export default LoadingHOC(Login);
