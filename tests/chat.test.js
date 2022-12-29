import {
  afterEach, beforeEach, expect, test,
} from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../app/index.js';
import { COMMAND_CHAT } from '../constants/command.js';
import { createEvents, TIMEOUT, USER_ID } from './utils.js';

beforeEach(() => {
  //
});

afterEach(() => {
  removePrompt(USER_ID);
});

test('COMMAND_CHAT', async () => {
  const events = [
    ...createEvents([`${COMMAND_CHAT.text}人工智慧`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(USER_ID).lines.length).toEqual(3 * 2);
  const replies = results.map(({ messages }) => messages.map(({ text }) => text));
  expect(replies).toEqual(
    [
      ['OK!'],
    ],
  );
}, TIMEOUT);
