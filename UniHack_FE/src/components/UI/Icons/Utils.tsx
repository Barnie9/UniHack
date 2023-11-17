import { Svgs } from "environment";
import { SvgComponent } from "types";

interface IconMetadataProps {
  alt: string;
  tooltip?: string;
}

export function useIconMetadata(svg: SvgComponent): IconMetadataProps {
  switch (svg) {
    case Svgs.Add:
      return {
        alt: "Add icon",
        tooltip: "Add",
      };

    case Svgs.ArrowDown:
      return {
        alt: "Arrow Down Alt",
      };

    case Svgs.ArrowLeft:
      return {
        alt: "arrowLeftAlt",
      };

    case Svgs.Calendar:
      return {
        alt: "calendarAlt",
        tooltip: "calendar",
      };

    case Svgs.ChevronArrowCorner:
      return {
        alt: "chevronArrowCornerAlt",
      };

    case Svgs.ChevronDown:
      return {
        alt: "chevronDownAlt",
      };

    case Svgs.ChevronLeft:
      return {
        alt: "chevronLeftAlt",
      };

    case Svgs.ChevronLeftDouble:
      return {
        alt: "chevronLeftDoubleAlt",
      };

    case Svgs.ChevronRight:
      return {
        alt: "chevronRightAlt",
      };

    case Svgs.ChevronRightDouble:
      return {
        alt: "chevronRightDoubleAlt",
      };

    case Svgs.ChevronUp:
      return {
        alt: "chevronUpAlt",
      };

    case Svgs.Clear:
      return {
        alt: "clearAlt",
        tooltip: "clear",
      };

    case Svgs.Clock:
      return {
        alt: "clockAlt",
      };

    case Svgs.Close:
      return {
        alt: "closeAlt",
        tooltip: "close",
      };

    case Svgs.Delete:
      return {
        alt: "deleteAlt",
        tooltip: "delete",
      };
    case Svgs.Merge:
      return {
        alt: "mergeAlt",
        tooltip: "merge",
      };
    case Svgs.Import:
      return {
        alt: "importAlt",
        tooltip: "import",
      };

    case Svgs.Edit:
      return {
        alt: "editAlt",
        tooltip: "edit",
      };

    case Svgs.File:
      return {
        alt: "fileAlt",
      };
    case Svgs.FilePlus:
      return {
        alt: "filePlusAlt",
        tooltip: "filePlus",
      };
    case Svgs.FileText:
      return {
        alt: "fileTextAlt",
      };

    case Svgs.Filter:
      return {
        alt: "filterAlt",
        tooltip: "filter",
      };

    case Svgs.Folder:
      return {
        alt: "folderAlt",
      };
    case Svgs.FormCheckboxSelected:
      return {
        alt: "formCheckboxSelectedAlt",
      };
    case Svgs.FormCheckboxUnselected:
      return {
        alt: "formCheckboxUnselectedAlt",
      };
    case Svgs.FormRadioSelected:
      return {
        alt: "formRadioSelectedAlt",
      };
    case Svgs.FormRadioUnselected:
      return {
        alt: "formRadioUnselectedAlt",
      };

    case Svgs.Help:
      return {
        alt: "helpAlt",
        tooltip: "help",
      };
    case Svgs.Information:
      return {
        alt: "informationAlt",
        tooltip: "info",
      };
    case Svgs.ExternalLink:
      return {
        alt: "externalLinkAlt",
        tooltip: "externalLink",
      };
    case Svgs.MenuProjects:
      return {
        alt: "menuProjectsAlt",
        tooltip: "menuProjects",
      };
    case Svgs.MenuProms:
      return {
        alt: "menuPromsAlt",
        tooltip: "menuProms",
      };
    case Svgs.Minus:
      return {
        alt: "minusAlt",
      };
    case Svgs.More:
      return {
        alt: "moreAlt",
        tooltip: "more",
      };

    case Svgs.Notifications:
      return {
        alt: "notificationsAlt",
        tooltip: "notifications",
      };
    case Svgs.PreviewOff:
      return {
        alt: "previewOffAlt",
        tooltip: "previewOff",
      };
    case Svgs.PreviewOn:
      return {
        alt: "previewOnAlt",
        tooltip: "previewOn",
      };
    case Svgs.Print:
      return {
        alt: "printAlt",
        tooltip: "print",
      };
    case Svgs.Refresh:
      return {
        alt: "refreshAlt",
        tooltip: "refresh",
      };
    case Svgs.Repeat:
      return {
        alt: "repeatAlt",
      };
    case Svgs.Search:
      return {
        alt: "searchAlt",
        tooltip: "search",
      };

    case Svgs.Settings:
      return {
        alt: "settingsAlt",
        tooltip: "settings",
      };
    case Svgs.User:
      return {
        alt: "userAlt",
      };
    case Svgs.ViewGrid:
      return {
        alt: "viewGridAlt",
      };
    case Svgs.ViewList:
      return {
        alt: "viewListAlt",
      };

    case Svgs.Workplace:
      return {
        alt: "workplaceAlt",
      };
    case Svgs.ZoomOut:
      return {
        alt: "zoomOutAlt",
        tooltip: "zoomOut",
      };

    default:
      return {
        alt: "",
        tooltip: "",
      };
  }
}
