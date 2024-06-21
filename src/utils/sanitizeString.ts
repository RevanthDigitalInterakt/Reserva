export const sanitizeString = (str: string): string => String(str)
  .replace(/ /g, '_')
  .replace(/[^a-zA-Z0-9_-]/g, '');
