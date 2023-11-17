let context: CanvasRenderingContext2D | null;

function getCanvasContext() {
	if (!context) {
		const canvasEl = document.createElement('canvas');
		canvasEl.style.display = 'none';
		document.body.appendChild(canvasEl);
		if (canvasEl) {
			context = canvasEl.getContext('2d');
		}
	}
	return context;
}

export function useMeasureText() {
	function measureText(text: string, font = '16px DM Sans') {
		const context = getCanvasContext();
		if (context) {
			context.font = font;
			const { width } = context.measureText(text);
			return width;
		}
		return 0;
	}

	return { measureText };
}
