import React from "react";
import seedrandom from "seedrandom";

import { Icon } from "components/UI/Icons";
import { Colors, ColorsX, Svgs } from "environment";

import { AvatarImage, UserAvatar } from "./Avatar.style";
import { Flex } from "components/UI/Flex";
import { Typography } from "components/UI/Typography";
import { AVATARS_COLORS_X } from "consts";

export enum AvatarSizes {
  s = 2.4,
  m = 4,
  l = 8,
}

interface AvatarData {
  userFirstName?: string;
  userSirName?: string;
  imageURL?: string;
  imageString?: string;
}

interface Props {
  userId: string | null; // when null avatar is in pending state
  data: AvatarData;
  loading?: boolean;
  alt?: string;
  size: (size: typeof AvatarSizes) => AvatarSizes;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Set userId to null when user is in pending state
 * @param param0
 * @returns
 */
export function Avatar({ userId, data, alt, loading, size, onClick }: Props) {
  const avatarSize = size(AvatarSizes);

  function getInitials() {
    let displayedName = "";
    if (data.userFirstName)
      displayedName = displayedName.concat(
        data.userFirstName.charAt(0).toUpperCase()
      );
    if (data.userSirName)
      displayedName = displayedName.concat(
        data.userSirName.charAt(0).toUpperCase()
      );

    switch (avatarSize) {
      case AvatarSizes.l:
        return (
          <Typography.H2 color={ColorsX.text.main}>
            {displayedName}
          </Typography.H2>
        );
      case AvatarSizes.m:
        return (
          <Typography.H6 color={ColorsX.text.main}>
            {displayedName}
          </Typography.H6>
        );
      case AvatarSizes.s:
        return (
          <Typography.Caption color={ColorsX.text.main}>
            {displayedName}
          </Typography.Caption>
        );
    }
  }

  const avatarImageSrc = data.imageString || data.imageURL;

  // Using a predictable randomness algorithm that will always generate the same
  // result if given the same input. The result will always be 0.xxxxxxxxxxxxxx
  const randomIndex = seedrandom(userId ?? "pending")()
    .toString()
    .substring(2);

  // We're taking the first two decimals to use them as an index to select a color
  let formattedIndex = parseInt(
    randomIndex.substring(0, 2) + randomIndex.substring(randomIndex.length),
    10
  );

  if (formattedIndex > AVATARS_COLORS_X.length)
    formattedIndex = Math.floor(formattedIndex / 10);

  // Generated random could be 0.00xxxxxxxxxxxx
  if (formattedIndex === 0) formattedIndex = 1;

  const avatarColor = AVATARS_COLORS_X[formattedIndex - 1];

  if (loading)
    return <UserAvatar size={avatarSize} background={Colors.silver.light} />;

  if (!userId) {
    return (
      <Icon
        svg={Svgs.User}
        style={{
          maxHeight: `${avatarSize}rem`,
          maxWidth: `${avatarSize}rem`,
        }}
        colors={{
          color: ColorsX.text.disabled,
          background: ColorsX.avatar.pending,
        }}
        customSize={avatarSize - 0.8}
        paddingOffset={{ all: 0.4 }}
      />
    );
  }

  return (
    <UserAvatar
      onClick={onClick}
      size={avatarSize}
      background={avatarColor}
      cursor={onClick ? "pointer" : undefined}
      id="avatar"
    >
      {avatarImageSrc ? (
        <AvatarImage src={avatarImageSrc} alt={alt} />
      ) : (
        <Flex justify={(j) => j.center} align={(a) => a.center}>
          {getInitials()}
        </Flex>
      )}
    </UserAvatar>
  );
}
