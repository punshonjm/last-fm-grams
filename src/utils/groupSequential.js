
const groupSequential = (collection, predicate) => {
  const groups = {};
  let lastUsed = null;
  let ci = 0;

  collection.forEach((item) => {
    if (item[predicate] !== lastUsed) {
      ci += 1;
      lastUsed = item[predicate];
      groups[`${ci}.${lastUsed}`] = {
        ...item,
        key: lastUsed,
        items: [item],
      };
    }

    groups[`${ci}.${lastUsed}`].items.push(item);
  });

  return Object.values(groups);
};

export default groupSequential;
