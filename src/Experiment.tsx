import React, { Component, ReactChild } from 'react';
import getLocalStorageVariant from './utils/getLocalStorageVariant';
import chooseVariant from './utils/chooseVariant';

export type VariantProps = {
  name: string;
  weight: number;
};

type ExperimentProps = {
  children: JSX.Element[] | JSX.Element;
  name: React.ReactText;
  winner?: (experimentName: string | number, selectedVariant: string) => any;
};

type ExperimentState = {
  selectedVariant: string | ReactChild[];
};

class Experiment extends Component<ExperimentProps, ExperimentState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedVariant:
        getLocalStorageVariant(
          this.props.children,
          this.props.name,
          this.props.winner,
        ) ||
        chooseVariant(this.props.children, this.props.name, this.props.winner),
    };
  }

  render() {
    return this.state.selectedVariant;
  }
}

export default Experiment;
