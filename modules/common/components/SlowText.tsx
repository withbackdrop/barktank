import { useEffect, useRef, useState } from 'react';

interface SlowTextProps {
  speed: number;
  text: string;
}

const SlowText = ({ speed, text }: SlowTextProps) => {
  const [placeholder, setPlaceholder] = useState<string>(text[0]);

  const index = useRef(0);

  useEffect(() => {
    const tick = () => {
      index.current++;
      setPlaceholder((prev: string) => prev + text[index.current]);
    };

    if (index.current < text.length - 1) {
      const addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

export default SlowText;
