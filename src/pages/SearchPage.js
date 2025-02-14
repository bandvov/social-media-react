import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box, TextField, Container } from "@mui/material";
import Posts from "../components/Posts/Posts";
import DOMPurify from "dompurify";
import {
  fetchPostsRequest,
} from "../features/posts/postsSlice";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";
import { fetchUsersRequest } from "../features/user/userSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabIndex, setTabIndex] = useState(+searchParams.get("tab") ?? 0);
  const [query, setQuery] = useState("");
  const { page } = useSelector((state) => state.post);

  useEffect(() => {
    const cleanQuery = DOMPurify.sanitize(searchParams.get("s"));
    setQuery(cleanQuery);
  }, []);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    setSearchParams({ s: query, tab: newValue });
  };
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((cleanQuery) => {
      if (cleanQuery) {
        dispatch(
          fetch({
            query: cleanQuery,
            category: getSearchType(tabIndex),
            page: page + 1,
          })
        );
        setSearchParams({ tab: tabIndex, s: cleanQuery });
      }
    }, 500),
    [dispatch, tabIndex]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const cleanQuery = DOMPurify.sanitize(e.target.value);
    setQuery(cleanQuery);
    debouncedSearch(cleanQuery);
  };

  const getSearchType = () => ["posts", "users", "mentions"][tabIndex];
  const fetch = (props) =>
    [fetchPostsRequest,fetchUsersRequest][tabIndex](props);

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={query}
          onChange={handleInputChange}
        />

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{ display: "flex", border: "1px solid red", mt: 2 }}
        >
          {["Posts", "Users", "Mentions"].map((i) => {
            return (
              <Tab
                sx={{
                  flex: 1,
                }}
                label={i}
              />
            );
          })}
        </Tabs>
        {tabIndex === 0 && <Posts />}
        {tabIndex === 1 && <Posts />}
        {tabIndex === 2 && <Posts />}
      </Box>
    </Container>
  );
};

export default SearchPage;
