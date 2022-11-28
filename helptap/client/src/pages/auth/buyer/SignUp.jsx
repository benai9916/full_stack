import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// local
import LoginSignUpBox from "components/LoginSignUpBox";
import useFormValidate from "hooks/useFormValidate";
import LoadingHOC from "components/common/LoadingHOC";
import { signUp } from "store/slices/auth";
import { BUYER } from "constants";
import { useEffect } from "react";

const SignUp = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoading } = props;
  const { isLoading, isError, data } = useSelector((state) => state.auth);

  const handleSignup = () => {
    let formData = {
      ...values,
      ["buyerName"]: values.name,
      ["clientType"]: BUYER,
    };
    delete formData.name;
    dispatch(signUp(formData));
  };

  const { values, errors, handleChange, handleSubmit } =
    useFormValidate(handleSignup);

  useEffect(() => {
    setLoading(isLoading);
    if (!isError && data?.id) {
      localStorage.setItem('id', data?.id)
      navigate(`/buyer/${data?.id}`);
    }
  }, [isLoading, isError, data]);

  return (
    <LoginSignUpBox
      mode="Signup"
      values={values}
      errors={errors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default LoadingHOC(SignUp);
