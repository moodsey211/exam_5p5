import { connect } from 'react-redux';
import { Outlet } from 'react-router';
import { mapStateToProps } from 'src/utils';

function Page(props: any) {
  const { app } = props;

  return <Outlet context={{ app }} />;
}

export default connect(mapStateToProps)(Page);