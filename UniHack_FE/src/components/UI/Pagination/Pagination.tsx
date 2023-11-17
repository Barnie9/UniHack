import React from "react";
import { Select } from "../Interactables/Select";
import { Icon } from "../Icons";
import { Typography } from "../Typography";
import { Svgs } from "environment";

import { PageInput } from "./PageInput";

import {
  Container,
  Counts,
  Controls,
  Control,
  Caption,
  PageSize,
  Wrapper,
  PageSizeAndCounts,
} from "./Pagination.style";

interface Props {
  totalCount?: number;
  totalCountLabel?: string;
  filteredCount?: number;
  pageIndex: number;
  pageSize: number;
  pagesCount: number;
  simpleVersion?: boolean;
  showCounts?: boolean;
  className?: string;
  openPageInputOnRight?: boolean;
  extraPageSizeOptions?: number[];
  changePage: (index: number) => void;
  changePageSize?: (size: number) => void;
}

export function Pagination({ className, ...props }: Props) {
  return (
    <Container className={className}>
      <Main {...props} />
      <Controllers {...props} />
    </Container>
  );
}

interface MainProps {
  totalCount?: number;
  totalCountLabel?: string;
  filteredCount?: number;
  pageSize: number;
  simpleVersion?: boolean;
  showCounts?: boolean;
  extraPageSizeOptions?: number[];
  changePageSize?: (size: number) => void;
}

function Main({
  simpleVersion = false,
  extraPageSizeOptions = [],
  totalCountLabel = "",
  pageSize,
  showCounts = true,
  filteredCount,
  totalCount,
  changePageSize,
}: MainProps) {
  function handleSizeChange(size: number) {
    if (changePageSize) changePageSize(size);
  }

  function getPageSizeOptions() {
    const defaultPageSizeOptions = [10, 25, 50, 100];

    return [defaultPageSizeOptions, extraPageSizeOptions].flat();
  }
  return (
    <>
      {!simpleVersion && (
        <PageSizeAndCounts>
          <PageSize>
            <Typography.Caption>Show</Typography.Caption>

            <Wrapper>
              <Select
                type={(s) => s.Tag}
                items={getPageSizeOptions().map((option) => ({
                  label: `${option}`,
                  value: `${option}`,
                }))}
                onSelect={(item) =>
                  item.value && handleSizeChange(parseInt(item.value, 10))
                }
                activeItem={(item) => item.value === pageSize.toString()}
                title={`${pageSize.toString()} ${totalCountLabel}`}
              />
            </Wrapper>
          </PageSize>

          {showCounts && (
            <Counts>
              <Typography.Caption>
                {filteredCount !== undefined && `${filteredCount} out of `}
                {`${totalCount} ${totalCountLabel}`}
              </Typography.Caption>
            </Counts>
          )}
        </PageSizeAndCounts>
      )}
    </>
  );
}

interface ControllersProps {
  pageIndex: number;
  pagesCount: number;
  openPageInputOnRight?: boolean;
  changePage: (index: number) => void;
}

function Controllers({
  openPageInputOnRight,
  pageIndex,
  pagesCount,
  changePage,
}: ControllersProps) {
  const canNextPage = pageIndex < pagesCount - 1;
  const canPreviousPage = pageIndex >= 1;

  function handlePageChange(index: number) {
    let i = index;

    if (index < 0) {
      i = 0;
    } else if (index >= pagesCount - 1) {
      i = pagesCount - 1;
    }

    changePage(i);
  }

  return (
    <Controls>
      {/* PREV */}
      <Control
        disabled={!canPreviousPage}
        onClick={() => canPreviousPage && handlePageChange(pageIndex - 1)}
      >
        <Icon svg={Svgs.ChevronLeft} disabled={!canPreviousPage} propagate />
      </Control>

      {pagesCount > 2 && (
        <Control
          active={pageIndex === 0}
          onClick={() => pageIndex !== 0 && handlePageChange(0)}
        >
          <Caption>1</Caption>
        </Control>
      )}
      {pagesCount > 3 && (
        <Control
          active={pageIndex === 1}
          onClick={() => pageIndex !== 1 && handlePageChange(1)}
        >
          <Caption>2</Caption>
        </Control>
      )}
      {pageIndex > 2 && pageIndex < pagesCount - 2 && (
        <PageInput
          pageIndex={pageIndex}
          openPageInputOnRight={openPageInputOnRight}
          onPageChange={handlePageChange}
        />
      )}
      {pageIndex > 1 && pageIndex < pagesCount - 2 && (
        <Control active>
          <Caption>{pageIndex + 1}</Caption>
        </Control>
      )}
      {pagesCount > 4 && pageIndex !== pagesCount - 3 && (
        <PageInput
          pageIndex={pageIndex}
          openPageInputOnRight={openPageInputOnRight}
          onPageChange={handlePageChange}
        />
      )}
      {pagesCount > 1 && (
        <Control
          active={pageIndex === pagesCount - 2}
          onClick={() =>
            pageIndex !== pagesCount - 2 && handlePageChange(pagesCount - 2)
          }
        >
          <Caption>{pagesCount - 1}</Caption>
        </Control>
      )}
      <Control
        active={pageIndex === pagesCount - 1}
        onClick={() =>
          pageIndex !== pagesCount - 1 && handlePageChange(pagesCount - 1)
        }
      >
        <Caption>{pagesCount}</Caption>
      </Control>

      {/* NEXT */}
      <Control
        disabled={!canNextPage}
        onClick={() => canNextPage && handlePageChange(pageIndex + 1)}
      >
        <Icon svg={Svgs.ChevronRight} disabled={!canNextPage} propagate />
      </Control>
    </Controls>
  );
}

Pagination.Main = Main;
Pagination.Controllers = Controllers;
