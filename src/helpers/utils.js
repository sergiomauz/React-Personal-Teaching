const findByTestAttribute = (component, attribute) => component.find(`[data-test='${attribute}']`);

export default findByTestAttribute;
