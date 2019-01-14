import React from 'react';
import Emitter from './events';
import checkIfIsVariant from './checkIfIsVariant';

import { VariantProps } from '../Experiment';

function chooseVariant(
  children: JSX.Element[] | JSX.Element,
  experimentName,
  winner,
) {
  var childrenArr = React.Children.toArray(children);

  const variants = React.Children.map(
    children,
    (variantObj: React.ReactElement<VariantProps>) => {
      if (!checkIfIsVariant(variantObj)) {
        throw new Error('Wrap the Experiment children in a Variant tag');
      }

      return variantObj.props.name;
    },
  ).sort();

  const weights = childrenArr.reduce(
    (weights, variant: React.ReactElement<VariantProps>) => {
      let variantWeight = variant.props.weight || 1;

      weights.push(variantWeight);

      return weights;
    },
    [],
  );

  const weightSum = weights.reduce((a: number, b: number) => {
    return a + b;
  }, 0);

  let weightedIndex = Math.floor(Math.random() * weightSum);

  let selectedVariant = variants[variants.length - 1];

  for (let index = 0; index < weights.length; index++) {
    weightedIndex -= weights[index];
    if (weightedIndex < 0) {
      selectedVariant = variants[index];
      break;
    }
  }

  if (winner instanceof Function) {
    winner(experimentName, selectedVariant);
  }

  const getVariantComponent = childrenArr.filter(
    (variantObj: React.ReactElement<VariantProps>) => {
      if (variantObj.props.name === selectedVariant) {
        return variantObj;
      }
    },
  );

  Emitter.chooseNewVariant(experimentName, selectedVariant);
  window.sessionStorage.setItem(experimentName, selectedVariant);

  return getVariantComponent;
}

export default chooseVariant;
