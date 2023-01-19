import { addHours, format } from 'date-fns';

interface ICustomFieldObject {
  '__typename': string;
  'cacheId': string,
  'key': string,
  'value': string
}

const formatDate = (date: string): string => {
  if (!date.length) return '';

  return format(
    addHours(new Date(Date.parse(date)), 3),
    'dd/MM/yyyy',
  );
};

const formatAndSearcFieldValue = <TDefaultReturn>(
  customFields: Array<ICustomFieldObject>,
  searchField: string,
  defaultReturn: TDefaultReturn,
): string | TDefaultReturn => {
  const fieldSearch = customFields.find(
    (customField: ICustomFieldObject) => customField.key === searchField,
  );

  if (fieldSearch) {
    if ('value' in fieldSearch) {
      if (fieldSearch.value === 'null' || !fieldSearch.value) return defaultReturn;
      return fieldSearch.value;
    }
  }

  return defaultReturn;
};

export { formatDate, formatAndSearcFieldValue };
