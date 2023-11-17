import React, { useState, useEffect } from "react";

import { Popover } from "components/UI/Interactables/Popover";
import { Button } from "components/UI/Interactables/Button";
import { InputType } from "types";

import { Control, Caption } from "../Pagination.style";
import { Input, Row } from "./PageInput.style";
import { Typography } from "components/UI/Typography";

interface Props {
  pageIndex: number;
  openPageInputOnRight?: boolean;
  onPageChange: (index: number) => void;
}

export function PageInput({
  pageIndex,
  openPageInputOnRight,
  onPageChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState((pageIndex + 1).toString());

  useEffect(() => {
    setValue((pageIndex + 1).toString());
  }, [pageIndex]);

  function handlePageChange() {
    const page = Number(value);

    if (page - 1 !== pageIndex) {
      onPageChange(page - 1);
      setOpen(false);
    }
  }

  return (
    <Popover
      open={open}
      width={20}
      offset={{
        top: 5,
        ...(openPageInputOnRight ? { left: -10 } : { right: 0 }),
      }}
      toggleComponent={({ ref, toggle }) => (
        <Control ref={ref} onClick={toggle}>
          <Caption>...</Caption>
        </Control>
      )}
      onToggle={(open) => setOpen(open)}
    >
      <div>
        <Typography.Paragraph>Change page</Typography.Paragraph>
        <Row>
          <Input
            type={InputType.Number}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant={(v) => v.primary}
            title={"Go"}
            onClick={handlePageChange}
            paddingOffset={{ x: 1 }}
            minWidth={6}
          />
        </Row>
      </div>
    </Popover>
  );
}
