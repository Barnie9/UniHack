import { RefObject } from "react";
import format from "date-fns/format";

import { DATE_TIME_FORMAT_FILENAME } from "consts";
import {
  Offset,
  FileType,
  ExportFileNames,
  StringMap,
  SelectItem,
  Bounds,
} from "types";

export function getPositionWithinBounds<T extends HTMLElement>(
  ref: React.RefObject<T>,
  targetRef: React.RefObject<T>
) {
  let bounds: Offset | null = null;

  if (ref.current && targetRef.current) {
    const { right } = ref.current.getBoundingClientRect();
    const target = targetRef.current.getBoundingClientRect();

    if (right >= target.right) {
      bounds = { left: right - target.right };
    }
  }

  return bounds;
}

export function getElementBounds<T extends HTMLElement>(
  ref: React.RefObject<T>
): Bounds {
  let bounds = { bottom: 0, left: 0, right: 0, top: 0, height: 0, width: 0 };

  if (ref.current) {
    bounds = ref.current.getBoundingClientRect();
  }

  return bounds;
}

export function downloadFile(
  data: string,
  name: string,
  type: FileType = FileType.Default
) {
  const blob = new Blob([data], { type });

  // @ts-ignore
  if (window.navigator.msSaveBlob) {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    // @ts-ignore
    window.navigator.msSaveBlob(blob, name);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.setAttribute("download", name);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (!a.download) {
      a.setAttribute("target", "_blank");
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

export function downloadFileFromUrl(
  fileUrl: string,
  name?: string,
  targetBlank?: boolean
) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = fileUrl;
  name && a.setAttribute("download", name);
  targetBlank && a.setAttribute("target", "_blank");

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(fileUrl);
}

export function stringAsBoolean(value: string) {
  return yn(value, { default: false }) || false;
}

export function decodeURIComponentSafe(string: string) {
  if (!string) return string;

  const regex = /^(?:[^%]|%[0-9A-Fa-f]{2})+$/;

  if (string.match(regex)) return decodeURIComponent(string);

  return decodeURIComponent(string.replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25"));
}

export function isOnMac() {
  return (
    navigator.userAgent.indexOf("Mac OS X") !== -1 ||
    navigator.platform.indexOf("Mac") > -1
  );
}

export function isOnWindows() {
  return (
    navigator.userAgent.indexOf("Windows") !== -1 ||
    navigator.platform.indexOf("Win") > -1
  );
}

export function timeout(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

interface ExtendedElement extends Element {
  offsetHeight: number;
}

export function isPageScrollable() {
  const root = document.querySelector("#root") as ExtendedElement;

  if (root) return root.offsetHeight > document.body.offsetHeight;
}

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function getExportFileName(
  type: ExportFileNames,
  projectId: string,
  projectName: string
) {
  const projectNameString = projectName
    .split(" ")
    .join("_")
    .toLocaleLowerCase();
  let dateString = null;

  dateString = format(new Date(), DATE_TIME_FORMAT_FILENAME);

  const tableTypes = [
    // DATASET
    ExportFileNames.DatasetTable,
    // ANALYSIS
    ExportFileNames.FrequenciesTable,
    ExportFileNames.ExploreTable,
    ExportFileNames.CompareNumericTable,
    ExportFileNames.CrosstabTable,
    ExportFileNames.ComparePairedTable,
  ];

  let fileName = `${projectId}-${projectNameString}-${type}-${dateString}`;

  if (tableTypes.includes(type)) fileName = fileName.concat(".csv");

  return fileName;
}

// Calculates the distance from a div to
// every side of the window
export function calculateDistance({ current }: RefObject<HTMLDivElement>) {
  if (current) {
    const top = current.getBoundingClientRect().top + window.pageYOffset;
    const bottom = current.getBoundingClientRect().bottom;
    const left = current.getBoundingClientRect().left;
    const right = current.getBoundingClientRect().right;

    const distance = {
      top: top + current.offsetHeight,
      bottom: window.innerHeight - bottom + current.offsetHeight,
      left,
      right: window.innerWidth - right,
    };

    return distance;
  }
}

/**
 * It returns a conditional console function that ca be turned ON or OFF.
 *
 * Very helpful when there are a lot of important debugging logs in the code.
 *
 * @param debug `boolean` - set to `true` in order to activate the log
 * @param type `console` types (ex: 'error', 'warn') - defaults to 'log'
 *
 * @example
 *
 * debuggerLog(true) // no custom type - console.log
 *
 * debuggerLog(true, 'error') // custom type - console.error
 */
export function debuggerLog(debug: boolean, type: keyof Console = "log") {
  function log(message?: any, ...optionalParams: any[]) {
    // @ts-ignore
    if (debug) console[type](message, ...optionalParams);
  }

  return log;
}

export function showOnTouchDevices(initialClass = "") {
  return initialClass.concat(" showOnTouchDevices");
}

/**
 * Transforms plain `string[]` into `{ label: string; value: string }[]`
 *
 * @param items - plain list of items to transform
 */
export function formatToSelectItems(items: string[]): SelectItem[] {
  return items.map((item) => ({ label: item, value: item }));
}

export function paginate<T>(array: T[], pageSize: number, pageIndex: number) {
  return array.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
}

/**
 * Calculates the total height of the `Header` components
 *
 * @returns `{ px, rem }`
 */
export function getHeaderHeight() {
  const classNames = [
    "header-main",
    "header-navigation",
    "header-title",
    "header-title__spacer",
  ];

  const height = classNames.reduce((acc, className) => {
    const element = document.querySelector(`.${className}`);

    if (element) {
      const { height } = element.getBoundingClientRect();

      acc += height;
    }

    return acc;
  }, 0);

  return {
    px: height,
    rem: height / 10,
  };
}

export function loseFocus() {
  const inputElement = document.createElement("input");

  inputElement.setAttribute(
    "style",
    `
			display: block;
			width: 0;
			height: 0;
			border: 0;
			margin: 0;
			padding: 0;
			opacity: 0;
		`
  );

  document.body.append(inputElement);

  // DEBOUNCE IN CALL STACK
  setTimeout(() => {
    inputElement.focus({ preventScroll: true });
    inputElement.blur();
    inputElement.remove();
  });
}

export function yn(
  value: string,
  { default: default_ }: { default?: boolean } = {}
) {
  if (default_ !== undefined && typeof default_ !== "boolean") {
    throw new TypeError(
      `Expected the \`default\` option to be of type \`boolean\`, got \`${typeof default_}\``
    );
  }

  if (value === undefined || value === null) {
    return default_;
  }

  value = String(value).trim();

  if (/^(?:y|yes|true|1|on)$/i.test(value)) {
    return true;
  }

  if (/^(?:n|no|false|0|off)$/i.test(value)) {
    return false;
  }

  return default_;
}

/**
 * Transforms relative indexes to absolute indexes
 *
 * ex: `sourceIndex = 2` and pagination `pageIndex = 1`
 *
 * => `sourceIndex = 12`
 */
export function parsePaginationRelativeIndexes(
  sourceIndex: number,
  destinationIndex: number,
  pagination: {
    pageIndex: number;
    pageSize: number;
  }
) {
  const { pageIndex, pageSize } = pagination;

  const absoluteIndexes = {
    sourceIndex,
    destinationIndex,
  };

  if (pageIndex) {
    const offset = pageIndex * pageSize;

    absoluteIndexes.sourceIndex += offset;
    absoluteIndexes.destinationIndex += offset;
  }

  return absoluteIndexes;
}
