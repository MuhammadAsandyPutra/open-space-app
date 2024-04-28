import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  TOGGLE_LIKE_TALK_DETAIL: 'TOGGLE_LIKE_TALK_DETAIL',
};

const receiveTalkDetailActionCreator = (talkDetail) => ({
  type: ActionType.RECEIVE_TALK_DETAIL,
  payload: {
    talkDetail,
  },
});

const clearTalkDetailActionCreator = () => ({
  type: ActionType.CLEAR_TALK_DETAIL,
});

const toggleLikeTalkDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
  payload: {
    userId,
  },
});

const asyncReceiveTalkDetail = (talkId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const talkDetail = await api.getTalkDetail(talkId);
    dispatch(receiveTalkDetailActionCreator(talkDetail));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const asyncToggleLikeTalkDetail = () => async (dispatch, getState) => {
  const { authUser, talkDetail } = getState();
  dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

  try {
    await api.toggleLikeTalk(talkDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

export {
  ActionType,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  toggleLikeTalkDetailActionCreator,
  asyncReceiveTalkDetail,
  asyncToggleLikeTalkDetail,
};
