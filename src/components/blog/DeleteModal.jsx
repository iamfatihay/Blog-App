import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styles } from "../../styles/globalStyle";
// import useBlogCalls from "../../hooks/useBlogCalls"; // Not used in demo mode
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ open, handleCloseDelete, id }) => {
    // const { deleteBlogData } = useBlogCalls(); // Not used in demo mode
    const navigate = useNavigate();

    const handleDelete = () => {
        // Demo mode - just show success message
        alert(
            "Demo mode: Blog post deleted successfully! (This is just a demo)"
        );
        handleCloseDelete();
        navigate("/");
    };
    return (
        <Modal
            open={open}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center" }}
                >
                    Do you really want to delete your blog? This process cannot
                    be undone!
                </Typography>
                <Typography
                    id="modal-modal-description"
                    component="div"
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={handleCloseDelete}
                        sx={{ m: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={handleDelete}
                        sx={{ m: 2 }}
                    >
                        Delete
                    </Button>
                </Typography>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
