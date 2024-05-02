export function TimeSort(data, dateASC) {
  const sortedData = [...data].sort((a, b) => {
    const timestampA = new Date(a.creationDate);
    const timeStampB = new Date(b.creationDate);
    return dateASC ? timestampA - timeStampB : timeStampB - timestampA;
  });

  return sortedData;
}

export function TimeStamp(data, dateASC) {
  const sortedData = [...data].sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timeStampB = new Date(b.timestamp);
    return dateASC ? timestampA - timeStampB : timeStampB - timestampA;
  });

  return sortedData;
}
