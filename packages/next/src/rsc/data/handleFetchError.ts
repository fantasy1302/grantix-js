import { HeadlessConfig, LOGTYPE, fetchRedirect, log } from '@headstartwp/core';
import { notFound, permanentRedirect, redirect } from 'next/navigation';

export async function handleFetchError(error: Error, config: HeadlessConfig, path = '') {
	const { redirectStrategy, sourceUrl, debug } = config;

	if (debug?.devMode) {
		log(LOGTYPE.INFO, '[handleError] error', error.name, error.message);
	}

	if (error.name === 'NotFoundError') {
		if (redirectStrategy === '404' && path.length > 0) {
			const redirectObject = await fetchRedirect(path, sourceUrl || '');

			if (redirectObject.location) {
				if ([301, 308].includes(redirectObject.status)) {
					permanentRedirect(redirectObject.location);
				} else {
					redirect(redirectObject.location);
				}
			}
		}

		notFound();
	}
}
