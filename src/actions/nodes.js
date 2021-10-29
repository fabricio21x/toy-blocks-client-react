import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res, blocksRes) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
    blocksRes,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const nodeResponse = await fetch(`${node.url}/api/v1/status`);
      const blocksResponse = await fetch(`${node.url}/api/v1/blocks`);

      if (nodeResponse.status >= 400 || blocksResponse.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const nodeJson = await nodeResponse.json();
      const blocksJson = (await blocksResponse.json()).data.map(
        ({ id, attributes }) => {
          const { index, data } = attributes;
          return { id, index, data };
        }
      );

      dispatch(checkNodeStatusSuccess(node, nodeJson, blocksJson));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}
