import React from 'react';

export function isElement(node: React.ReactNode, name: string) {
	if (!node) return false;
	if (!React.isValidElement(node)) return false;
	if (typeof node.type === 'string') return false;

	return node.type.name === name;
}

export function truncateText(text: string, limit: number) {
	return text.length > limit ? `${text.substr(0, limit - 3)}...` : text;
}
