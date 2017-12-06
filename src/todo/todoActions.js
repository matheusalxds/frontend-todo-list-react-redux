export const changeDescription = (e) => ({
  // Will return an Object 
  type: 'DESCRIPTION_CHANGED',
  payload: e.target.value,
});

