function Type<T>(object: unknown): T {
  return (object as unknown) as T;
}

function StringRecord<T>(object: unknown) {
  return Type<Record<string, T>>(object);
}

export { Type, StringRecord };
