import React from 'react';

type VariantProps = {
  name: string | number;
  children: any;
};

class Variant extends React.Component<VariantProps> {
  render() {
    return this.props.children;
  }
}

export default Variant;
