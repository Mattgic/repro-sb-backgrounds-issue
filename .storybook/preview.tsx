import { PartialStoryFn } from "@storybook/csf";
import { Decorator, ReactFramework } from "@storybook/react";
import React, { FC, ReactNode, useEffect, useState } from "react";

export const parameters = {
  backgrounds: {
    default: "blue",
    values: [
      {
        name: "blue",
        value: "lightblue",
      },
      {
        name: "red",
        value: "red",
      },
      {
        name: "green",
        value: "green",
      },
    ],
  },
};

const AsyncLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  });

  // Background override works if we disable this block
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

const fontLoaderDecorator = (StoryFn): JSX.Element => {
  return (
    <AsyncLoader>
      <StoryFn />
    </AsyncLoader>
  );
};

export const decorators = [fontLoaderDecorator];
