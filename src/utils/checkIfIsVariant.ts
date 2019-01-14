function checkIfIsVariant(variantObj) {
  if (variantObj.type.name === 'Variant') {
    return true;
  }

  return false;
}

export default checkIfIsVariant;
