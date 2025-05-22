// Responsive breakpoints
export const breakpoints = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common responsive styles
export const responsiveStyles = {
  container: {
    base: {
      width: '95%',
      margin: '0 auto',
      padding: '0 1rem',
    },
    md: {
      width: '90%',
      padding: '0 2rem',
    },
    lg: {
      width: '85%',
      padding: '0 3rem',
    },
  },
  
  grid: {
    base: {
      columns: 1,
      gap: '1rem',
    },
    sm: {
      columns: 2,
      gap: '1.5rem',
    },
    md: {
      columns: 3,
      gap: '2rem',
    },
    lg: {
      columns: 4,
      gap: '2rem',
    },
  },
  
  typography: {
    h1: {
      base: {
        fontSize: '2rem',
        lineHeight: '1.2',
      },
      md: {
        fontSize: '2.5rem',
      },
      lg: {
        fontSize: '3rem',
      },
    },
    h2: {
      base: {
        fontSize: '1.75rem',
        lineHeight: '1.3',
      },
      md: {
        fontSize: '2rem',
      },
      lg: {
        fontSize: '2.5rem',
      },
    },
    body: {
      base: {
        fontSize: '1rem',
        lineHeight: '1.5',
      },
      md: {
        fontSize: '1.125rem',
      },
    },
  },
  
  spacing: {
    base: {
      section: '2rem',
      element: '1rem',
    },
    md: {
      section: '3rem',
      element: '1.5rem',
    },
    lg: {
      section: '4rem',
      element: '2rem',
    },
  },
};

// Responsive utility functions
export const getResponsiveValue = (values, breakpoint) => {
  if (typeof values === 'object') {
    return values[breakpoint] || values.base;
  }
  return values;
};

// Common responsive grid template columns
export const gridTemplateColumns = {
  base: '1fr',
  sm: 'repeat(2, 1fr)',
  md: 'repeat(3, 1fr)',
  lg: 'repeat(4, 1fr)',
  xl: 'repeat(5, 1fr)',
};

// Common responsive padding
export const responsivePadding = {
  base: '1rem',
  md: '2rem',
  lg: '3rem',
};

// Common responsive margin
export const responsiveMargin = {
  base: '1rem',
  md: '2rem',
  lg: '3rem',
};

// Common responsive font sizes
export const responsiveFontSizes = {
  xs: {
    base: '0.75rem',
    md: '0.875rem',
  },
  sm: {
    base: '0.875rem',
    md: '1rem',
  },
  md: {
    base: '1rem',
    md: '1.125rem',
  },
  lg: {
    base: '1.125rem',
    md: '1.25rem',
  },
  xl: {
    base: '1.25rem',
    md: '1.5rem',
  },
  '2xl': {
    base: '1.5rem',
    md: '1.875rem',
  },
  '3xl': {
    base: '1.875rem',
    md: '2.25rem',
  },
  '4xl': {
    base: '2.25rem',
    md: '3rem',
  },
}; 