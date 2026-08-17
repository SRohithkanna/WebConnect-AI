import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { createPost, getPosts, deletePost } from "../api/postApi";

import { useSelector } from "react-redux";

const PostsPage = () => {
  const user = useSelector((state) => state.auth.user);

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      

      setLoading(true);
      setError("");

      const response = await getPosts();

      setPosts(response.data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);

      setError("Unable to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!text.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError("");

      const response = await createPost(text.trim());

      const newPost = response.data;

      setPosts((currentPosts) => [newPost, ...currentPosts]);

      setText("");
    } catch (error) {
      console.error("Failed to create post:", error);

      setError("Unable to create post.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId),
      );
    } catch (error) {
      console.error("Failed to delete post:", error);

      setError("Unable to delete post.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        py: 4,
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Developer Feed
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Share your work, ideas, and experiences with other developers.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            placeholder="What's on your mind?"
            value={text}
            onChange={(event) => setText(event.target.value)}
            inputProps={{
              maxLength: 2000,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleCreatePost}
              disabled={creating || !text.trim()}
            >
              {creating ? "Posting..." : "Create Post"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" textAlign="center">
              No posts yet. Be the first developer to post!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => {
            const isOwner = user?._id === post.user?._id;

            return (
              <Card
                key={post._id}
                sx={{
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={700}>
                        {post.user?.name || "Developer"}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        @{post.user?.username || "developer"}
                      </Typography>
                    </Box>

                    {isOwner && (
                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.date
                      ? new Date(post.date).toLocaleString()
                      : "Date unavailable"}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default PostsPage;
