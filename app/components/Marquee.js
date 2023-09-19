import React, { useState } from "react";
import { View } from "react-native";
import { Marquee, MarqueeDirections } from "react-native-ui-lib";

export default function TheMarquee(props) {
  const [state, setState] = useState({
    duration: 6000,
    directionHorizontal: true,
    directionVertical: true,
    numOfReps: -1,
  });
  return (
    <View style={{ padding: 0 }}>
      <Marquee
        key={`${state.directionHorizontal}-${state.duration}-${state.numOfReps}`}
        label={"Hey there, welcome to shopit, we are the best in town!"}
        direction={
          state.directionHorizontal
            ? MarqueeDirections.LEFT
            : MarqueeDirections.RIGHT
        }
        duration={state.duration}
        numberOfReps={state.numOfReps}
        labelStyle={{ color: props.state.darkTheme ? "white" : "black" }}
      />
    </View>
  );
}
