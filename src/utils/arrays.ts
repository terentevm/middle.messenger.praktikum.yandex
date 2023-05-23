interface ObjectWithId {
  id: number | string;
}

export function removeFromArray<T extends ObjectWithId>(arr: T[], id: number | string) : T[] {
  const ind = arr.findIndex((item:T) => item.id === id);

  if (ind == -1) {
    return [...arr];
  }

  return [
    ...arr.slice(0, ind),
    ...arr.slice(ind + 1),
  ];
}
