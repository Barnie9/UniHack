import { useCallback, useMemo } from "react";
import { generate } from "shortid";
import { isUndefined } from "lodash";

import {
  useDispatch,
  //   useUploadDocument,
} from "hooks";
import { OperationResult } from "hooks/store/types";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import { DraggedFile } from "components/UI/DragAndDrop/DragAndDrop";
import { setError } from "store/ui/activities";
import { isOnMac } from "helpers";
import { ACCEPTED_EXCEL_FILE_TYPES } from "types";

interface Data {
  getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
  isDragActive: boolean;
}

export interface OnFileDropOptions {
  readerResult: string;
  file: DraggedFile;
  isBinaryFile: boolean;
}

interface Error {
  code: string;
  message: string;
}

interface RejectedFile {
  file: DraggedFile;
  errors: Error[];
}

interface Props {
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  readerType?: ReaderType;
  dropzoneType?: DropzoneType;
  disabled?: boolean;
  onFileDialogCancel?: () => void;
  onFileDrop?: (options: OnFileDropOptions) => void;
  setImportFileName?: (fileName: string) => void;
}

export enum ReaderType {
  BINARY,
  STRING,
  BASE64,
}

export enum DropzoneType {
  ENTRY,
  DOCUMENT,
  DATASET,
}

export function useImportDropzone({
  acceptedFileTypes,
  maxFileSize,
  readerType,
  dropzoneType,
  disabled,
  onFileDialogCancel,
  onFileDrop,
  setImportFileName,
}: Props): OperationResult<
  Data,
  (acceptedFiles: any, rejectedFiles: any) => void
> {
  const dispatch = useDispatch();
  //   const [, uploadFile] = useUploadDocument();

  const maxFileSizeString = useMemo(() => {
    if (maxFileSize === undefined) return "";
    if (maxFileSize < 1000000) {
      // if smaller than 1MB then disply KB
      return `${maxFileSize / 1000} KB`;
    } else {
      // display MB
      return `${maxFileSize / 1000000} MB`;
    }
  }, [maxFileSize]);

  function onDropError(errorMessage: string) {
    // dispatch(
    //   setError({
    //     type: ActionTypes.ADD_LOCAL_ENTRY_FILE,
    //     error: errorMessage,
    //     uuid: generate(),
    //   })
    // );
  }

  function onFileAccepted(file: File) {
    const reader = new FileReader();

    (dropzoneType === DropzoneType.DATASET ||
      dropzoneType === DropzoneType.DOCUMENT) &&
      setImportFileName &&
      setImportFileName(file.name);

    // UPLOADING THE DIRECT BINARY DATA WITHOUT THE READER
    // FOR DOCUMENTS ON PROJECT LEVEL
    if (dropzoneType === DropzoneType.DOCUMENT) {
      return;
    }

    const fileExtension = file.name.split(".").pop() ?? "";

    const isBinaryFile = ACCEPTED_EXCEL_FILE_TYPES.includes(
      isOnMac() ? file.type : fileExtension
    );

    // Binary
    if (isBinaryFile) {
      if (readerType === ReaderType.BINARY || isUndefined(readerType)) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
    // Base64
    else if (readerType === ReaderType.BASE64) reader.readAsDataURL(file);
    // Text / Default
    else reader.readAsText(file);

    reader.onload = async () => {
      let readerResult = reader.result as string;

      // Remove unecessary string in front of the base64 content
      if (readerType === ReaderType.BASE64)
        readerResult = readerResult.slice(readerResult.indexOf("base64,") + 7);

      onFileDrop &&
        onFileDrop({
          readerResult,
          file: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
          isBinaryFile,
        });
    };

    let readerErrorMessage = "";
    reader.onabort = () => (readerErrorMessage = "Aborded");
    reader.onerror = () => (readerErrorMessage = "Failed");
    readerErrorMessage && onDropError && onDropError(readerErrorMessage);
  }

  /**
   * Applies validation on given file.
   * Triggers onDropError with the errors found
   * @param file
   */
  function onFilesRejected(files: RejectedFile[]) {
    let errorMessage = "";
    if (files.length > 1) {
      errorMessage = "Too many files";
    } else if (files.length === 1) {
      const { file } = files[0];

      if (maxFileSize && file.size > maxFileSize) {
        errorMessage = `Too large - ${maxFileSizeString}`;
      }

      if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
        const fileType = file.name.split(".").pop();
        if (fileType) {
          const message = `Not supported file - ${fileType}`;
          errorMessage = errorMessage ? errorMessage + "\n" + message : message;
        }
      }
    }

    errorMessage && onDropError(errorMessage);
  }

  const onDrop = useCallback(
    // TODO TYPE THESE THINGS
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        onFilesRejected(rejectedFiles);
      } else if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    noKeyboard: true,
    // @ts-ignore
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    disabled: disabled,
    onDrop,
    onFileDialogCancel,
  });

  return [
    {
      data: { getRootProps, getInputProps, isDragActive },
      loading: false,
      // @ts-ignore
      error: false,
    },
    onDrop,
  ];
}
