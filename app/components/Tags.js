import { Text } from "react-native";

const H1 = ({ children, style }) => {
  return <Text style={{ fontSize: 32, ...style }}>{children}</Text>;
};
const H2 = ({ children, style }) => {
  return <Text style={{ fontSize: 24, ...style }}>{children}</Text>;
};

const H3 = ({ children, style }) => {
  return <Text style={{ fontSize: 18.72, ...style }}>{children}</Text>;
};
const H4 = ({ children, style }) => {
  return <Text style={{ fontSize: 16, ...style }}>{children}</Text>;
};
const H5 = ({ children, style }) => {
  return <Text style={{ fontSize: 13.28, ...style }}>{children}</Text>;
};
const H6 = ({ children, style }) => {
  return <Text style={{ fontSize: 10.72, ...style }}>{children}</Text>;
};

export { H1, H2, H3, H4, H5, H6 };
