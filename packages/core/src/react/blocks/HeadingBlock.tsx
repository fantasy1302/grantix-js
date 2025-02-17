'use client';

import { isBlockByName } from '../../dom';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface HeadingBlockProps extends IBlockAttributes {
	level: number;
}

export interface IHeadingBlock extends IBlock<HeadingBlockProps> {}

export function HeadingBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
	children,
	component: Component,
	style,
}: IHeadingBlock) {
	const { name, className, attributes } = useBlock<HeadingBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	const level = attributes.level ?? Number(node.tagName.replace('h', ''));

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			level={level}
			attributes={blockAttributes}
			style={style}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace HeadingBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlockByName(node, 'core/heading');
		},
	};
}
