import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingHOC = (WrappedComponent) => {
  const WithLoading = (props) => {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = (isComponentLoading) =>
      setLoading(isComponentLoading);

    return (
      <>
        {isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  };
  return WithLoading;
};

export default LoadingHOC;
