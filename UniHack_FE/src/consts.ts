import { ColorsX } from "environment";

export const SEARCH_DEBOUNCE_TIME = 300;
export const UPDATE_DEBOUNCE_TIME = 400;
export const ANALYSIS_DEBOUNCE_TIME = 800;
export const FETCH_DEBOUNCE_TIME = 1000;
export const DEFAULT_ACTIVITY_TIMEOUT = 6000;
export const SIDEBAR_OFFSET = 64;

export const YEAR_FORMAT = "yyyy";
export const DATE_FORMAT = "yyyy-MM-dd";
export const DATE_FORMAT_COMMA = "MMM dd, yyyy";
export const PICKER_DATE_FORMAT = "yyyy/MM/dd";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DATE_TIME_FORMAT__NO_SECONDS = "yyyy-MM-dd HH:mm";
export const DATE_TIME_12H_FORMAT__NO_SECONDS = "yyyy-MM-dd h:mm aa";
export const DATE_TIME_FORMAT_FILENAME = "yyyy_MM_dd-HH_mm_ss";
export const DATE_TIME_TIMEZONE_FORMAT = "yyyy-MM-dd HH:mm:ssxx";
export const TIME_FORMAT = "HH:mm";
export const TIME_TIMEZONE_FORMAT = "HH:mm:ssxx";

export const DEFAULT_DATE_TIME_FORMAT = "24";

export const ENTRY_FILE_SIZE_LIMIT = 4000000;
export const DATASET_FILE_SIZE_LIMIT = 9000000;
export const DOCUMENT_FILE_SIZE_LIMIT = 6000000;

export const MAX_SAFE_INTEGER_VARIABLE_VALUE = 2147483647;

export const VAR_LABEL_PATTERN = /^[^;,]+$/;

export const JADBIO_PROBABILITIES_DENSITY_SEGMENTS = 8;

export const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export const DATE_TIME_REGEX =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9](?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX_WITHOUT_PREFIX = /[0-9]{2,14}/;
export const PHONE_REGEX_WITH_PLUS_PREFIX = /(([+])\d[0-9]{6,14})/;

export const DEFAULT_TABLE_PAGE_SIZE = 10;

export const DROPDOWN_ITEM = {
  regular: {
    minHeight: 50,
  },
  button: {
    minHeight: 42,
  },
};

export const AVATARS_COLORS_X = [
  ColorsX.avatar.paleGreyLight,
  ColorsX.avatar.hospitalGreen,
  ColorsX.avatar.mutedPink,
  ColorsX.avatar.lightSalmon,
  ColorsX.avatar.lightSalmonMedium,
  ColorsX.avatar.darkCream,
  ColorsX.avatar.lightBlue,
  ColorsX.avatar.lightGreyBlue,
  ColorsX.avatar.heather,
  ColorsX.avatar.paleTeal,
];

export const CHART_HEIGHT = 450;

export const CHART_COLORS = [
  ColorsX.chart.primary.dark,
  ColorsX.chart.red.dark,
  ColorsX.chart.violet.dark,
  ColorsX.chart.lightBlue.dark,
  ColorsX.chart.lightGreen.dark,
  ColorsX.chart.darkGreen.dark,
  ColorsX.chart.orange.dark,
  ColorsX.chart.yellow.dark,
  ColorsX.chart.pink.dark,
  ColorsX.chart.darkBlue.dark,
  ColorsX.chart.primary.medium,
  ColorsX.chart.red.medium,
  ColorsX.chart.violet.medium,
  ColorsX.chart.lightBlue.medium,
  ColorsX.chart.lightGreen.medium,
  ColorsX.chart.darkGreen.medium,
  ColorsX.chart.orange.medium,
  ColorsX.chart.yellow.medium,
  ColorsX.chart.pink.medium,
  ColorsX.chart.darkBlue.medium,
  ColorsX.chart.primary.light,
  ColorsX.chart.red.light,
  ColorsX.chart.violet.light,
  ColorsX.chart.lightBlue.light,
  ColorsX.chart.lightGreen.light,
  ColorsX.chart.darkGreen.light,
  ColorsX.chart.orange.light,
  ColorsX.chart.yellow.light,
  ColorsX.chart.pink.light,
  ColorsX.chart.darkBlue.light,
];

export const keyMaps = {
  escape: ["Escape", "Esc", "27", 27],
  enter: ["Enter", "13", 13],
  backspace: ["Backspace"],
  tab: ["Tab"],
  arrowLeft: ["ArrowLeft", "37", 37],
  arrowRight: ["ArrowRight", "39", 39],
  arrowUp: ["ArrowUp", "38", 38],
  arrowDown: ["ArrowDown", "40", 40],
  delete: ["Delete", "46", 46],
  backSlash: ["Backslash", "/", "220", 220],
  forwardSlash: ["Slash", "NumpadDivide", "/", "191", "111", 191, 111],
  comma: ["Comma", ",", "188", 188],
  letter: {
    c: ["KeyC", "c", "67", 67],
  },
};

export const supportsTouch =
  "ontouchstart" in window || navigator.maxTouchPoints;

export const SYSTEM_GENERATED_STATUS_NAME = "none_generated";

export const STATUS_COLUMN = {
  name: "status_column",
  label: "Status",
};

// export const dateTimeFormatMap: Record<DateTimeFormat, string> = {
// 	'24': DATE_TIME_FORMAT__NO_SECONDS,
// 	'12': DATE_TIME_12H_FORMAT__NO_SECONDS
// };

export const ENTRY_FIELD_FORCE_DROPDOWN_THRESHOLD = 100;
