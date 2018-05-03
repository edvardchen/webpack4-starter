// @flow
import React from 'react';

import { render } from 'react-dom';

/* global window */
const { document } = window;
const root = document.createElement('div');
root.id = 'react-root';
document.body.appendChild(root);
render(<p>Hello World!</p>, root);
