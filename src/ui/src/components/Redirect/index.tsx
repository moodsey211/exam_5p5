import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { mapStateToProps } from 'src/utils';
import Spinner from '@components/Spinner';
import { validateToken } from '@store/actions';

function Redirect(props: any) {
  const { app, authPath, guestPath } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!app.loading && !app.isAuthenticated && app.token && app.token !== "") {
      dispatch(validateToken());
    }
  }, [
    app,
  ]);

  // if we are not authenticated but we have a token, we need to check if the token is valid
  if (!app.isAuthenticated && app.token && app.token !== "") {
    return <Spinner />;
  }

  return <Navigate to={app.isAuthenticated ? authPath : guestPath} />;
}

export default connect(mapStateToProps)(Redirect);