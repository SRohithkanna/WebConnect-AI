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

import {
  createPost,
  getPosts,
  deletePost,
  getComments,
  createComment,
  deleteComment,
} from "../api/postApi";

import { useSelector } from "react-redux";

const PostsPage = () => {
  const user = useSelector((state) => state.auth.user);

  const [posts, setPosts] = useState([]);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  // Comments are stored using postId as the key
  const [comments, setComments] = useState({});

  const [commentText, setCommentText] = useState({});

  const [loadingComments, setLoadingComments] = useState({});

  const [creatingComment, setCreatingComment] = useState({});

  // --------
  //Href link
  //----------
  const renderCommentText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#90caf9",
              textDecoration: "underline",
              wordBreak: "break-all",
            }}
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  // --------------------------------
  // Load Posts
  // --------------------------------

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

  // --------------------------------
  // Create Post
  // --------------------------------

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

  // --------------------------------
  // Delete Post
  // --------------------------------

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId),
      );

      // Remove comments for deleted post
      setComments((currentComments) => {
        const updatedComments = {
          ...currentComments,
        };

        delete updatedComments[postId];

        return updatedComments;
      });
    } catch (error) {
      console.error("Failed to delete post:", error);

      setError("Unable to delete post.");
    }
  };

  // --------------------------------
  // Load Comments
  // --------------------------------

  const handleLoadComments = async (postId) => {
    try {
      setLoadingComments((current) => ({
        ...current,
        [postId]: true,
      }));

      setError("");

      const response = await getComments(postId);

      setComments((current) => ({
        ...current,
        [postId]: response.data || [],
      }));
    } catch (error) {
      console.error("Failed to load comments:", error);

      setError("Unable to load comments.");
    } finally {
      setLoadingComments((current) => ({
        ...current,
        [postId]: false,
      }));
    }
  };

  // --------------------------------
  // Create Comment
  // --------------------------------

  const handleCreateComment = async (postId) => {
    const text = commentText[postId]?.trim();

    if (!text) {
      return;
    }

    try {
      setCreatingComment((current) => ({
        ...current,
        [postId]: true,
      }));

      setError("");

      const response = await createComment(postId, text);

      const newComment = response.data;

      setComments((current) => ({
        ...current,
        [postId]: [newComment, ...(current[postId] || [])],
      }));

      setCommentText((current) => ({
        ...current,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Failed to create comment:", error);

      setError("Unable to create comment.");
    } finally {
      setCreatingComment((current) => ({
        ...current,
        [postId]: false,
      }));
    }
  };

  // --------------------------------
  // Delete Comment
  // --------------------------------

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);

      setComments((current) => ({
        ...current,
        [postId]: (current[postId] || []).filter(
          (comment) => comment._id !== commentId,
        ),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);

      setError("Unable to delete comment.");
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Page Header */}

      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Developer Feed
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Share your work, ideas, and experiences with other developers.
      </Typography>

      {/* Error */}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Create Post */}

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

      {/* Posts */}

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
                  {/* Post Header */}

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

                  {/* Post Content */}

                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.text}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {post.date
                      ? new Date(post.date).toLocaleString()
                      : "Date unavailable"}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Comments Header */}

                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Comments
                  </Typography>

                  {/* Load Comments Button */}

                  <Button
                    size="small"
                    onClick={() => handleLoadComments(post._id)}
                    disabled={loadingComments[post._id]}
                    sx={{ mb: 2 }}
                  >
                    {loadingComments[post._id] ? "Loading..." : "View Comments"}
                  </Button>

                  {/* Comments */}

                  {comments[post._id]?.map((comment) => {
                    const isCommentOwner = user?._id === comment.user?._id;

                    return (
                      <Box
                        key={comment._id}
                        sx={{
                          mb: 2,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.04)",
                        }}
                      >
                        {/* Comment Header */}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box>
                            <Typography fontWeight={600}>
                              {comment.user?.name || "Developer"}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              @{comment.user?.username || "developer"}
                            </Typography>
                          </Box>

                          {/* Delete Own Comment */}

                          {isCommentOwner && (
                            <Button
                              size="small"
                              color="error"
                              onClick={() =>
                                handleDeleteComment(post._id, comment._id)
                              }
                            >
                              Delete
                            </Button>
                          )}
                        </Box>

                        {/* Comment Text */}

                        <Typography
                          sx={{
                            mt: 1,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {renderCommentText(comment.text)}
                        </Typography>

                        {/* Comment Date */}

                        <Typography variant="caption" color="text.secondary">
                          {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleString()
                            : "Date unavailable"}
                        </Typography>
                      </Box>
                    );
                  })}

                  {/* Create Comment */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Write a comment..."
                      value={commentText[post._id] || ""}
                      onChange={(event) =>
                        setCommentText((current) => ({
                          ...current,
                          [post._id]: event.target.value,
                        }))
                      }
                      inputProps={{
                        maxLength: 500,
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={() => handleCreateComment(post._id)}
                      disabled={
                        creatingComment[post._id] ||
                        !commentText[post._id]?.trim()
                      }
                    >
                      {creatingComment[post._id] ? "Posting..." : "Comment"}
                    </Button>
                  </Box>
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
