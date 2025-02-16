import { runSaga } from 'redux-saga';
import { fetchFollowersRequest, fetchFollowersSuccess, fetchFollowersFailure } from './followersSlice';
import { fetchFollowers } from './followersApi';
import { handleFetchFollowers } from './followersSaga';

// Mock the API call and select the state
jest.mock('./followersApi');
const mockFetchFollowers = fetchFollowers;

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
