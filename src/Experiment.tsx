import React, { Component } from "react";
import Emitter from './events'

type ExperimentProps = {
  children: any
  name: React.ReactText
  winner?: (experimentName: string | number, selectedVariant: string) => any
}

type ExperimentState = {
  selectedVariant: string
}

class Experiment extends Component<ExperimentProps, ExperimentState> {
  constructor(props) {
    super(props)
    this.state = {
      selectedVariant: this.getLocalStorageVariant() || this.chooseVariant(this.props.children, this.props.name)
    }
  }

  checkIfIsVariant(variantObj: any) {
    if (variantObj.type.name === 'Variant') {
      return true
    }
  
    return false
  }
  
  chooseVariant(children, experimentName) {
    const variants = children.map(variantObj => {
      if (!this.checkIfIsVariant(variantObj)) {
        throw new Error("Wrap the Experiment children in a Variant tag")
      }
  
      return (
        variantObj.props.name
      )
    }).sort();
  
    const weights = children.reduce((weights, variant) => {
      let variantWeight = variant.props.weight || 1
  
      weights.push(variantWeight);
  
      return weights;
    }, []);
  
    const weightSum = weights.reduce((a, b) => {
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

    if (this.props.winner instanceof Function) {
      this.props.winner(experimentName, selectedVariant)
    }
  
    Emitter.chooseNewVariant(experimentName, selectedVariant)
    window.sessionStorage.setItem(experimentName, selectedVariant)
    return selectedVariant;
  }

  getLocalStorageVariant() {
    const experimentName: any = this.props.name
    const getVariant = window.sessionStorage.getItem(experimentName)

    if (getVariant) {
      Emitter.getExistingVariant(getVariant)

      if (this.props.winner instanceof Function) {
        this.props.winner(experimentName, getVariant)
      }
      
    }

    return getVariant
  }


  render() {
    const getVariant = this.props.children.filter(variantObj => {
      if (variantObj.props.name === this.state.selectedVariant) {
        return variantObj;
      }
    });

    return getVariant;
  }
}

export default Experiment;
