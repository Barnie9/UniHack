import { FileMimeType } from 'types';

export const ACCEPTED_DOWNLOADABLE_TYPES = [
	FileMimeType.XLS,
	FileMimeType.XLSX,
	FileMimeType.CSV,
	FileMimeType.DOC,
	FileMimeType.DOCX,
	FileMimeType.ZIP,
	FileMimeType.XZIP
];
export const ACCEPTED_PREVIEWABLE_TYPES = [
	FileMimeType.JPG,
	FileMimeType.PNG,
	FileMimeType.BMP,
	FileMimeType.GIF,
	FileMimeType.PDF,
	FileMimeType.TXT,
	FileMimeType.TIFF
];

export const WIN_ACCEPTED_TYPES = ['.csv'];

export const ACCEPTED_DOCUMENT_TYPES = [
	...ACCEPTED_DOWNLOADABLE_TYPES,
	...ACCEPTED_PREVIEWABLE_TYPES,
	...WIN_ACCEPTED_TYPES
];

export const ACCEPTED_EXCEL_FILE_TYPES = [
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.ms-excel',
	'xls',
	'xlsx'
];

export const ACCEPTED_WINDOWS_TYPES = ['.csv', '.xlsx', '.xls'];

export const ACCEPTED_IMPORT_TYPES = [
	...ACCEPTED_EXCEL_FILE_TYPES,
	...ACCEPTED_WINDOWS_TYPES,
	'text/csv',
	'text/plain' // for .csv file on macOS, see https://github.com/react-dropzone/react-dropzone/issues/276
];

export const ACCEPTED_ENTRY_FILE_TYPES = [
	...ACCEPTED_DOWNLOADABLE_TYPES,
	...ACCEPTED_PREVIEWABLE_TYPES,
	...WIN_ACCEPTED_TYPES
];
