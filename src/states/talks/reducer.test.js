/* eslint-disable no-unused-vars */
/**
* test scenario for talksReducer
*
* - talkReducers function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by RECEIVE_TALKS action
*  - should return the talks with the new talk when given by ADD_TALK action
*  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
*
*/

import { describe, it, expect } from 'vitest';
import talksReducer from './reducer';

describe('talkReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
});
