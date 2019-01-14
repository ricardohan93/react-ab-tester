import React from 'react';
import Emitter from './events';

import { VariantProps } from '../Experiment';

function getLocalStorageVariant(
  children: JSX.Element[] | JSX.Element,
  experimentName: any,
  winner?: any,
) {
  const childrenArr = React.Children.toArray(children);
  const getVariant = window.sessionStorage.getItem(experimentName);

  if (getVariant) {
    Emitter.getExistingVariant(getVariant);

    const getComponentVariant = childrenArr.filter(
      (variantObj: React.ReactElement<VariantProps>) => {
        if (variantObj.props.name === getVariant) {
          return variantObj;
        }
      },
    );

    if (winner instanceof Function) {
      winner(experimentName, getVariant);
    }

    return getComponentVariant;
  }

  return getVariant;
}

export default getLocalStorageVariant;
