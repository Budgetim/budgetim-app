import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const CloseIcon = () => {
  const {
    colors: { textSecondary, systemGray05 },
  } = useTheme();

  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="15" fill={systemGray05} />
      <Path
        d="M10.0615 20.3618C10.3789 20.6792 10.9121 20.6665 11.2168 20.3682L15 16.585L18.7769 20.3682C19.0879 20.6792 19.6211 20.6792 19.9321 20.3618C20.2432 20.0444 20.2495 19.5176 19.9385 19.2065L16.1616 15.4233L19.9385 11.6465C20.2495 11.3354 20.2495 10.8086 19.9321 10.4912C19.6147 10.1802 19.0879 10.1738 18.7769 10.4849L15 14.2681L11.2168 10.4849C10.9121 10.1865 10.3726 10.1738 10.0615 10.4912C9.75049 10.8086 9.75684 11.3418 10.0552 11.6401L13.8384 15.4233L10.0552 19.2129C9.75684 19.5112 9.74414 20.0508 10.0615 20.3618Z"
        fill={textSecondary}
        fillOpacity="0.6"
      />
    </Svg>
  );
};
