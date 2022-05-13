/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {jest} from '@jest/globals';
import normalizeLocation from '../normalizeLocation';

describe('normalizeLocation', () => {
  it('rewrites locations with index.html', () => {
    expect(
      normalizeLocation({
        pathname: '/index.html',
      }),
    ).toEqual({
      pathname: '/',
    });

    expect(
      normalizeLocation({
        pathname: '/docs/introduction/index.html',
        search: '?search=foo',
        hash: '#features',
      }),
    ).toEqual({
      pathname: '/docs/introduction',
      search: '?search=foo',
      hash: '#features',
    });

    expect(
      normalizeLocation({
        pathname: '/index.html',
        search: '',
        hash: '#features',
      }),
    ).toEqual({
      pathname: '/',
      search: '',
      hash: '#features',
    });
  });

  it('removes html extension', () => {
    expect(
      normalizeLocation({
        pathname: '/docs/installation.html',
      }),
    ).toEqual({
      pathname: '/docs/installation',
    });
    expect(
      normalizeLocation({
        pathname: '/docs/introduction/foo.html',
        search: '',
        hash: '#bar',
      }),
    ).toEqual({
      pathname: '/docs/introduction/foo',
      search: '',
      hash: '#bar',
    });
  });

  it('does not strip extension if the route location has one', () => {
    expect(normalizeLocation({pathname: '/page.html'})).toEqual({
      pathname: '/page.html',
    });
  });

  it('leaves pathnames untouched', () => {
    const replaceMock = jest.spyOn(String.prototype, 'replace');

    expect(
      normalizeLocation({
        pathname: '/docs/introduction',
        search: '',
        hash: '#features',
      }),
    ).toEqual({
      pathname: '/docs/introduction',
      search: '',
      hash: '#features',
    });

    // For the sake of testing memoization
    expect(
      normalizeLocation({
        pathname: '/docs/introduction',
        search: '',
        hash: '#features',
      }),
    ).toEqual({
      pathname: '/docs/introduction',
      search: '',
      hash: '#features',
    });
    expect(replaceMock).toBeCalledTimes(1);

    expect(
      normalizeLocation({
        pathname: '/',
      }),
    ).toEqual({
      pathname: '/',
    });
  });
});
