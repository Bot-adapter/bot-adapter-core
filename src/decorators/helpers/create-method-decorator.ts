export const createMethodDecorator = () => () => {
  return function (): MethodDecorator {
    return function (target, propertyKey, descriptor) {};
  };
};
