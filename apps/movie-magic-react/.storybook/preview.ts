import type { DocsContainerProps } from '@storybook/blocks';
import { DocsContainer } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import * as React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

// Import any required css here
import '@/styles/main.css';

/*
 * We need to override the DocsContainer to work with the dark mode theme until this issue is resolved:
 * https://github.com/hipstersmoothie/storybook-dark-mode/issues/180
 */
function ThemedDocsContainer(props: DocsContainerProps) {
  const isDark = useDarkMode();
  return React.createElement(DocsContainer, {
    ...props,
    theme: isDark ? themes.dark : themes.light,
  });
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    darkMode: {
      stylePreview: true,
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
    },

    docs: {
      theme: themes.light, // Default theme
      container: ThemedDocsContainer,
    },
  },
};

export default preview;
