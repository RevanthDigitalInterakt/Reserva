const prefix = 'com.usereserva:id/' as const;

const testProps = (value: string) => {
  const testID = (value || '').startsWith(prefix) ? value : `${prefix}${value}`;

  return {
    testID,
    accessibilityLabel: testID,
  };
};

export default testProps;
