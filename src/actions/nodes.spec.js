import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

const node_blocks_response = {
  data: [
    {
      id: "1",
      attributes: {
        index: 1,
        data: "By reason of these things",
      },
    },
  ],
};

const node_blocks_mock = [
  {
    id: "1",
    index: 1,
    data: "By reason of these things",
  },
];

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
    blocks: [],
  };

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve(node_blocks_response);
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { node_name: "Secret Lowlands" },
        blocksRes: node_blocks_mock,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
