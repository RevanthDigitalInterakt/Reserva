export function queryFieldParser(queryField: string) {
  const regex = /queryField=(\d+)/;
  const match = regex.exec(queryField);

  if (!match?.[1]) return '';

  const parsedReferenceId = `collection:${match?.[1]}`;
  return parsedReferenceId;
}

export function referenceIdResolver(reference?: string) {
  if (!reference) return '';
  if (reference.includes('queryField=')) {
    return queryFieldParser(reference);
  }
  return reference;
}
