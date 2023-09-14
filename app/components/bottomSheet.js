import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

export default function BottomSheet({ children, refRBSheet, style }) {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      animationType="slide"
      customStyles={{ container: { ...style } }}
    >
      {children}
    </RBSheet>
  );
}
