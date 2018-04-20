export const validateInputs = (
  condition,
  tags,
  attending,
  date,
  userTags,
  wwl,
) => {
  if (condition === '') {
    return { error: `Name can't be blank` };
  }
  if (tags.length === 0) {
    return { error: `Need a rotation tag` };
  }
  if (attending === '') {
    return { error: `Attending can't be blank` };
  }
  if (date === '') {
    return { error: `Date can't be blank` };
  }
  if (wwl === '') {
    return { error: `Learning can't be blank` };
  }
  return { error: false };
};
