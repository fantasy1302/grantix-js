import {
	FrameworkError,
	HeadlessConfig,
	getHeadstartWPConfig,
	getSiteByHost,
} from '@headstartwp/core';
import deepmerge from 'deepmerge';
import { convertToPath } from '../../../data/convertToPath';

import type { NextQueryProps } from './types';

const { all: merge } = deepmerge;

export function prepareQuery<P>(
	query: NextQueryProps<P>,
	_config: HeadlessConfig | undefined = undefined,
) {
	const { routeParams, ...rest } = query;

	const path = routeParams?.path ?? '';
	const siteConfig = routeParams?.site ? getSiteByHost(routeParams?.site) : null;

	if (routeParams?.site && !siteConfig) {
		throw new FrameworkError(
			`Sub site not found, make sure to add ${routeParams?.site} to headstartwp.config.js`,
		);
	}

	const options = merge<NextQueryProps<P>['options']>([
		{
			headers: {
				cache: 'no-store',
			},
		},
		rest.options ?? {},
	]);

	const config = siteConfig ?? _config;
	const pathname = Array.isArray(path) ? convertToPath(path) : path;

	return {
		...rest,
		options,
		path: pathname,
		config: config ?? getHeadstartWPConfig(),
	};
}
