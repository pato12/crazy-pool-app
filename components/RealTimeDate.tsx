import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-elements';

interface IRealTimeDateProps {
  value: number;
  formater: (value: number) => string;
  interval: number;
}

function RealTimeDate(props: IRealTimeDateProps) {
  const [text, setText] = useState(() => props.formater(props.value));

  useEffect(() => {
    const interval = setInterval(() => setText(props.formater(props.value)), props.interval);
    return () => clearInterval(interval);
  }, [props.value, props.interval, props.formater]);

  return <Text>{text}</Text>;
}

export default RealTimeDate;
