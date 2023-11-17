import React from "react";
import { useMemo, forwardRef } from "react";

import { Icon } from "components/UI/Icons";
import { Loader } from "components/UI/Loader";
import { useImportDropzone } from "hooks/ui/useImportDropzone";
import { Svgs } from "environment";

import {
  BrowseButton,
  DragDropContainer,
  FileContainer,
  FileText,
  DragInDiv,
  ErrorMessage,
} from "./DragAndDrop.style";
import { OnFileDropOptions, ReaderType } from "hooks/ui/useImportDropzone";

export interface DraggedFile {
  name: string;
  size: number;
  type: string;
}

interface Props {
  filename?: string;
  acceptedFileTypes: string[];
  maxFileSize?: number;
  disabled?: boolean;
  forPrint?: boolean;
  loading?: boolean;
  error?: string;
  readerType?: ReaderType;
  onFileDialogCancel?: () => void;
  onFileDrop: (options: OnFileDropOptions) => void;
  onFilenameClick?: () => void;
}

export const DragAndDrop = forwardRef<HTMLInputElement, Props>(
  (
    {
      filename,
      acceptedFileTypes,
      maxFileSize,
      disabled,
      loading = false,
      error,
      forPrint = false,
      readerType = ReaderType.STRING,
      onFilenameClick,
      onFileDialogCancel,
      onFileDrop,
    },
    fileInputRef
  ) => {
    const [
      {
        data: { getRootProps, getInputProps, isDragActive },
      },
      onDrop,
    ] = useImportDropzone({
      acceptedFileTypes,
      maxFileSize,
      readerType,
      disabled,
      onFileDialogCancel,
      onFileDrop,
    });

    function onInputFilesUploaded(files: FileList) {
      if (files.length === 1) {
        const acceptedFiles: File[] = [];
        const rejectedFiles: File[] = [];
        const file = files[0];
        if (
          (maxFileSize && file.size > maxFileSize) ||
          !acceptedFileTypes.includes(file.type)
        ) {
          rejectedFiles.push(file);
        } else acceptedFiles.push(file);
        onDrop(acceptedFiles, rejectedFiles);
      }
    }

    const fileText = useMemo(
      () => filename && filename.slice(0, filename.lastIndexOf(".") + 1),
      [filename]
    );

    const fileExtension = useMemo(() => {
      if (!!filename && !loading && !error) return filename.split(".").pop();
      return "";
    }, [filename, loading, error]);

    return (
      <DragDropContainer
        {...getRootProps()}
        isDragActive={isDragActive}
        isFileDragged={!!filename || loading || !!error}
        error={!!error}
        disabled={!!disabled && !filename}
      >
        {!forPrint && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              multiple={false}
              onChange={(event) => {
                const files = event.target.files;
                if (files != null) onInputFilesUploaded(files);
              }}
              style={{ display: "none" }}
            />
            <input {...getInputProps()} />
          </>
        )}

        {!!filename || loading || error ? (
          <FileContainer
            title={`${fileText}${fileExtension}`}
            isDragActive={isDragActive}
            isClickable={!!onFilenameClick}
            onClick={onFilenameClick}
          >
            <Icon
              svg={Svgs.File}
              size={(s) => s.m}
              marginOffset={{ right: 0.4 }}
            />
            <FileText>
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                fileText
              )}
            </FileText>
            <span>{fileExtension}</span>
          </FileContainer>
        ) : (
          <DragInDiv isDragActive={isDragActive}>
            <BrowseButton data-test-id="browseButton" />
          </DragInDiv>
        )}
      </DragDropContainer>
    );
  }
);
