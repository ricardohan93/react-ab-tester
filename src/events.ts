function Emitter() {}

Emitter.prototype.chooseNewVariant = function(experimentName, variantName) {
  console.log(
    `Choose new variant ${variantName} from experiment ${experimentName}`,
  );
};

Emitter.prototype.getExistingVariant = function(variantName) {
  console.log(`Grab variant ${variantName} from LocalStorage`);
};

export default new Emitter();
