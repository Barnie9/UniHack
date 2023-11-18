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

export const DEFAULT_DEBOUNCE_TIME = 300;
export const REPORTS_DEBOUNCE_TIME = 400;

export const TIMESTAMP_FORMAT = "HH:mm";
export const DAY_FORMAT = "yyyy-LL-dd";
export const NOTIFICATION_EVENTS_DAY_FORMAT = "LLL dd yyyy";
export const NOTIFICATION_EVENT_DATE_FORMAT = "LLLL d yyyy, HH:mm";
export const NOTIFICATION_HISTORY_TOOLTIP_DATE_FORMAT = "LLLL dd";
export const DAYPICKER_FORMAT = "YYYY-MM-DD HH:mm";

export const EMAIL = "";
export const PHONE_NUMBER = "";

export const LINE_DATA_POINTS_LIMIT = 60;
export const BAR_DATA_POINTS_LIMIT = 9;
export const PIXEL_TO_REM_RATIO = 10;

export enum MetricType {
  Instant = "instant",
  Max = "max",
  Min = "min",
  Average = "average",
  Demand = "demand",
}

export enum ErrorCode {
  TokenNotValid = "token_not_valid",
}
