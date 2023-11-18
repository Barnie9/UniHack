export const Sizes = {
  xs: 320,
  sm: 425,
  md: 768,
  lg: 1024,
  xl: 1280,
  hd: 1440,
  fhd: 1920,
  qhd: 4500,
};

export const MediaQueries = {
  minWidth: {
    xs: `(min-width: ${Sizes.xs}px)`,
    sm: `(min-width: ${Sizes.sm}px)`,
    md: `(min-width: ${Sizes.md}px)`,
    lg: `(min-width: ${Sizes.lg}px)`,
    xl: `(min-width: ${Sizes.xl}px)`,
    hd: `(min-width: ${Sizes.hd}px)`,
  },
  minHeight: {
    xs: `(min-height: ${Sizes.xs}px)`,
    sm: `(min-height: ${Sizes.sm}px)`,
    md: `(min-height: ${Sizes.md}px)`,
    lg: `(min-height: ${Sizes.lg}px)`,
    xl: `(min-height: ${Sizes.xl}px)`,
    hd: `(min-height: ${Sizes.hd}px)`,
  },
  maxWidth: {
    xs: `(max-width: ${Sizes.xs}px)`,
    sm: `(max-width: ${Sizes.sm}px)`,
    md: `(max-width: ${Sizes.md}px)`,
    lg: `(max-width: ${Sizes.lg}px)`,
    xl: `(max-width: ${Sizes.xl}px)`,
    hd: `(max-width: ${Sizes.hd}px)`,
  },
  maxHeight: {
    xs: `(max-height: ${Sizes.xs}px)`,
    sm: `(max-height: ${Sizes.sm}px)`,
    md: `(max-height: ${Sizes.md}px)`,
    lg: `(max-height: ${Sizes.lg}px)`,
    xl: `(max-height: ${Sizes.xl}px)`,
    hd: `(max-height: ${Sizes.hd}px)`,
  },
};

export const MediaQueriesDevices = {
  app: `only screen and (max-width: ${Sizes.sm - 1}px)`,
  phone: `only screen and (min-width: ${Sizes.xs}px) and (max-width: ${
    Sizes.md - 1
  }px)`,
  tablet: `only screen and (min-width: ${Sizes.md}px) and (max-width: ${
    Sizes.hd - 1
  }px)`,
  laptop: `only screen and (min-width: ${Sizes.hd}px) and (max-width: ${
    Sizes.xl - 1
  }px)`,
  desktop: `only screen and (min-width: ${Sizes.xl}px) and (max-width: ${Sizes.fhd}px)`,
  qhd: `only screen and (min-width: ${Sizes.fhd + 1}px) and (max-width: ${
    Sizes.qhd
  }px)`,
};
