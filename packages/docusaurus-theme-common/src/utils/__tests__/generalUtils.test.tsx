/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useTitleFormatter} from '../generalUtils';
import {renderHook} from '@testing-library/react-hooks';
import {Context} from '@docusaurus/core/src/client/docusaurusContext';
import type {DocusaurusContext} from '@docusaurus/types';

describe('useTitleFormatter', () => {
  const createUseTitleFormatterMock =
    (context: DocusaurusContext) => (title?: string) =>
      renderHook(() => useTitleFormatter(title), {
        wrapper: ({children}) => (
          <Context.Provider value={context}>{children}</Context.Provider>
        ),
      }).result.current;
  it('works', () => {
    const mockUseTitleFormatter = createUseTitleFormatterMock({
      siteConfig: {
        title: 'my site',
        titleDelimiter: '·',
      },
    });
    expect(mockUseTitleFormatter('a page')).toBe('a page · my site');
    expect(mockUseTitleFormatter(undefined)).toBe('my site');
    expect(mockUseTitleFormatter('    ')).toBe('my site');
  });
});
