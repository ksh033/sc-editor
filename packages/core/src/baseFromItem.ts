type BaseFromItemProps<T = any> = {
  value: T;
  onChange: (val: T) => void;
  rowData?: any;
};
export { BaseFromItemProps };
