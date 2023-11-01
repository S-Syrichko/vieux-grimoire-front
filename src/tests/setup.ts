import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import {server} from '../mocks/server';

//API mocking server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//jest matchers
expect.extend(matchers);

afterEach(cleanup);


// mock des éléments (localStorage,)

// setup ton server worker de test

// mock des function / des timers / des éléments du DOM