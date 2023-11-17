import React from "react";
import { Typography } from "../Typography";
import { Asterisk } from "../Asterisk";

export function RequiredFields() {
  const text = "Required Fields";

  /**
   * KEPT HERE FOR SAFETY - SOMETIMES THE TRANSLATIONS ARE LOADED AFTER THE RENDER
   * CAUSING PAGE TO CRASH SINCE IT HAS NOTHING TO SPLIT
   */
  if (!text) return null;

  const splitText = (text as string).split("\n");

  return (
    <Typography.Caption>
      {splitText[0]} <Asterisk /> {splitText[1]}
    </Typography.Caption>
  );
}
