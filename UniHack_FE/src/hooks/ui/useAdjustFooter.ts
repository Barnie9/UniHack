import { useState, useEffect } from 'react';

import { DEFAULT_FOOTER_MARGIN_TOP } from 'components/UI/StickyFooter/StickyFooter';

/**
 * Adjusts footer's margin top if there are opened date pickers, dropdowns or select controls
 * @returns
 */
export default function useAdjustFooter(deps?: React.DependencyList) {
	const [marginTop, setMarginTop] = useState(DEFAULT_FOOTER_MARGIN_TOP);

	useEffect(() => {
		const timer = setTimeout(addDropdownsListeners, 10);

		return () => clearTimeout(timer);
	}, deps);

	function getBodyScrollTop() {
		return Math.max(
			window.pageYOffset,
			document.documentElement.scrollTop,
			document.body.scrollTop
		);
	}

	function getBodyScrollHeight() {
		return Math.max(
			document.documentElement.scrollHeight,
			document.body.scrollHeight,
			document.documentElement.offsetHeight,
			document.body.offsetHeight
		);
	}

	/**
	 * Creates observers for changes to UI elements that can affect and overlay the footer
	 */
	function addDropdownsListeners() {
		const mutationObserver = new MutationObserver(mutationCallback);

		const datePickerElements = document.querySelectorAll('.react-date-picker');
		if (datePickerElements) {
			datePickerElements.forEach(datePicker => {
				mutationObserver.observe(datePicker as Node, {
					attributes: true
				});
			});
		}

		const selectControlElements = document.querySelectorAll('.select__control');
		if (selectControlElements) {
			selectControlElements.forEach(selectControl => {
				mutationObserver.observe(selectControl as Node, {
					attributes: true
				});
			});
		}

		const dropdownsContainers = document.querySelectorAll('.custom-dropdown-container');
		if (dropdownsContainers) {
			dropdownsContainers.forEach(dropdownContainer => {
				mutationObserver.observe(dropdownContainer as Node, {
					childList: true
				});
			});
		}

		mutationObserver.disconnect();
	}

	// @ts-ignore
	function mutationCallback(mutationsList: MutationList[]) {
		let marginTop = DEFAULT_FOOTER_MARGIN_TOP;
		mutationsList.forEach(mutation => {
			// a calendar element opened or closed
			if (mutation.target.className.includes('react-date-picker'))
				marginTop = Math.max(marginTop, adjustDatePickerChange(mutation.target));

			//  a select control dropdown opened or closed
			if (mutation.target.className.includes('select__control'))
				marginTop = Math.max(marginTop, adjustSelectControlChange(mutation.target));

			//  a container dropdown opened or closed
			if (mutation.target.className.includes('custom-dropdown-container'))
				marginTop = Math.max(marginTop, adjustDropdownChange(mutation.target));
		});
		setMarginTop(marginTop);
	}

	/**
	 *
	 * @param datePickerElement
	 * @returns new marginTop for footer so it won't overlway the datePickerElement
	 */
	function adjustDatePickerChange(datePickerElement: Element) {
		if (datePickerElement.className.includes('--open')) {
			if (datePickerElement.lastChild && datePickerElement.lastChild.childNodes) {
				const calendarElement = datePickerElement.lastChild.childNodes[0];

				// a timeout is needed in order to read the updated values of the calendar element
				setTimeout(() => {
					const calendarOffsetBottom =
						getBodyScrollTop() +
						(calendarElement as Element).getBoundingClientRect().bottom;

					const footerMaxOffset = calculateFooterMaxOffset();

					if (footerMaxOffset.top < calendarOffsetBottom) {
						const overlaySize = calendarOffsetBottom - footerMaxOffset.top;
						// keep original margin and add the overlaySize plus 50 for calendar's feather effect
						setMarginTop(overlaySize + DEFAULT_FOOTER_MARGIN_TOP + 50);
					}
				}, 10);
			}
		}
		return 0;
	}

	/**
	 *
	 * @param selectControlElement
	 * @returns new marginTop for footer so it won't overlway the selectControlElement
	 */
	function adjustSelectControlChange(selectControlElement: Element) {
		if (selectControlElement.className.includes('--menu-is-open')) {
			const dropdownElement = selectControlElement.nextSibling;

			if (dropdownElement !== null) {
				const dropdownOffsetBottom =
					getBodyScrollTop() +
					(dropdownElement as Element).getBoundingClientRect().bottom;

				const footerMaxOffset = calculateFooterMaxOffset();

				if (footerMaxOffset.top < dropdownOffsetBottom) {
					const overlaySize = dropdownOffsetBottom - footerMaxOffset.top;
					// keep original margin and add the overlaySize plus a margin of 20
					return overlaySize + DEFAULT_FOOTER_MARGIN_TOP + 20;
				}
			}
		}
		return 0;
	}

	/**
	 *
	 * @param selectControlElement
	 * @returns new marginTop for footer so it won't overlway the dropdownContainer
	 */
	function adjustDropdownChange(dropdownContainer: Element) {
		// get second sibling which is the open dropdown's content and compare it's
		// bottom offset with the footer's maximum top offset

		if (dropdownContainer.childNodes && dropdownContainer.childNodes[1]) {
			const openDropdownElement = dropdownContainer.childNodes[1];
			const dropdownOffsetBottom =
				getBodyScrollTop() +
				(openDropdownElement as Element).getBoundingClientRect().bottom;

			const footerMaxOffset = calculateFooterMaxOffset();
			if (footerMaxOffset.top < dropdownOffsetBottom) {
				const overlaySize = dropdownOffsetBottom - footerMaxOffset.top;
				// keep original margin and add the overlaySize plus a margin of 20
				return overlaySize + DEFAULT_FOOTER_MARGIN_TOP + 20;
			}
		}
		return 0;
	}

	/**
	 * @returns footer's maximum top and bottom offsets related to the document's height
	 */
	function calculateFooterMaxOffset() {
		let footerMaxOffset = { top: 0, bottom: 0 };
		const footerElement = document.querySelector('.sticky-footer');
		if (footerElement) {
			const {
				height: footerHeight,
				top: footerTop,
				bottom: footerBottom
			} = footerElement.getBoundingClientRect();

			// If the footer is not at the bottom of the page then its maximum offset is the current offset.
			// Otherwise calculate it from documentHeight - footerHeight
			if (footerBottom < window.innerHeight) {
				footerMaxOffset = { top: footerTop, bottom: footerBottom };
			} else {
				footerMaxOffset = {
					top: getBodyScrollHeight() - footerHeight,
					bottom: getBodyScrollHeight()
				};
			}
		}
		return footerMaxOffset;
	}

	return { marginTop };
}
