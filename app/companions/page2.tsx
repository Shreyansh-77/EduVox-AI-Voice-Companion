import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

interface OwnProps {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const page2: FunctionComponent<Props> = (props) => {
  return ():
};

const mapStateToProps = (state: RootState) => {
  return {

  };
};

export default connect(mapStateToProps)(page2);
