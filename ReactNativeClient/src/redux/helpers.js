export const wrapAction = (type) => {
  const action = payload => ({
    type,
    payload,
  });

  action.toString = () => type;

  return action;
};

export const wrapReducer = (type, reducer) => (state, action) => {
  if (action.type === type.toString()) {
    return reducer(state, action);
  }

  return undefined;
};
