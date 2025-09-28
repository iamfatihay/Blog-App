import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
// import useBlogCalls from "../../hooks/useBlogCalls"; // Not used in demo mode

const CommentFormWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    maxHeight: "300px",
    overflowY: "auto",
}));

const CommentForm = ({ setBlogDetail, blogDetail, id }) => {
    // const { postBlogData, getBlogDataId } = useBlogCalls(); // Not used in demo mode
    const [commentData, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Demo mode - just show success message
        alert("Demo mode: Comment added successfully! (This is just a demo)");
        setComment("");
    };

    return (
        <CommentFormWrapper>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {(blogDetail.comments || []).map((comment) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.user}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline", mr: 2 }}
                                            component="span"
                                            variant="body4"
                                            color="text.secondary"
                                        >
                                            {new Date(comment.time_stamp)
                                                .toUTCString()
                                                .slice(0, 16)}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            {comment.content}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="middle" component="li" />
                    </React.Fragment>
                ))}
            </List>

            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 2,
                        p: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
                        border: "1px solid rgba(99, 102, 241, 0.1)",
                    }}
                >
                    <TextField
                        label="Add a comment"
                        name="content"
                        id="content"
                        type="text"
                        variant="outlined"
                        multiline
                        value={commentData}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Share your thoughts..."
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.5,
                            fontWeight: 600,
                            borderRadius: 2,
                            background:
                                "linear-gradient(45deg, #6366f1, #ec4899)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #4f46e5, #db2777)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Add Comment
                    </Button>
                </Box>
            </form>
        </CommentFormWrapper>
    );
};

export default CommentForm;
