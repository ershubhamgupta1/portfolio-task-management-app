import React, { useState, useEffect, FC } from 'react';

interface TagProps {
  text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  const [bgColor, setBgColor] = useState<string>('#ffffff');

  useEffect(() => {
    // Function to generate a random color
    const generateRandomColor = (): string => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Set a random background color
    setBgColor(generateRandomColor());
  }, []);

  const tagStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '20px',
    display: 'inline-block',
    margin: '5px',
    fontSize: '14px',
  };

  return <span style={tagStyle}>{text}</span>;
};

export default Tag;
