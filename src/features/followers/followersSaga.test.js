import { runSaga } from 'redux-saga';
import { fetchFollowersRequest, fetchFollowersSuccess, fetchFollowersFailure, removeFollowerRequest, removeFollowerSuccess, removeFollowerFailure } from './followersSlice';
import { fetchFollowers,removeFollower } from './followersApi';
import { handleFetchFollowers, handleRemoveFollower } from './followersSaga';

// Mock the API call and select the state
jest.mock('./followersApi');
const mockFetchFollowers = fetchFollowers;
const mockRemoveFollower = removeFollower;

 describe('handleFetchFollowers', () => {
  it('should dispatch fetchFollowersSuccess when API call is successful', async () => {
    const mockResponse = { data: ['follower1', 'follower2'], hasMore: true };
    mockFetchFollowers.mockResolvedValue(mockResponse);

    const dispatched = [];
    const fakeStore = {
      followers: { page: 1 },
    };
    const action = fetchFollowersRequest({page:1});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => fakeStore,
      },
      handleFetchFollowers,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(fetchFollowersSuccess({ data: mockResponse.data, hasMore: mockResponse.hasMore }));
  });

  it('should dispatch fetchFollowersFailure when API call fails', async () => {
    const mockError = new Error('API error');
    mockFetchFollowers.mockRejectedValue(mockError);

    const dispatched = [];
    const fakeStore = {
      followers: { page: 1 },
    };
    const action = fetchFollowersRequest({ page:1 });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => fakeStore,
      },
      handleFetchFollowers,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(fetchFollowersFailure(mockError.message));
  });
});


describe('handleRemoveFollower', () => {
  it('should dispatch removeFollowerSuccess when API call is successful', async () => {
    const mockResponse = { };
    mockRemoveFollower.mockResolvedValue(mockResponse);

    const dispatched = [];
    const fakeStore = {
      followers: { page: 1 },
    };
    const action = removeFollowerRequest({id:1});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => fakeStore,
      },
      handleRemoveFollower,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(removeFollowerSuccess());
  });

  it('should dispatch removeFollowerFailure when API call fails', async () => {
    const mockError = new Error('API error');
    mockRemoveFollower.mockRejectedValue(mockError);

    const dispatched = [];
    const fakeStore = {
      followers: { page: 1 },
    };
    const action = removeFollowerRequest({ id:1 });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => fakeStore,
      },
      handleRemoveFollower,
      action
    ).toPromise();

    expect(dispatched).toContainEqual(removeFollowerFailure(mockError.message));
  });
});