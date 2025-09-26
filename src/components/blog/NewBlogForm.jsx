import * as React from "react";
import { useState } from "react";
// import useBlogCall from "../../hooks/useBlogCalls"; // Not used in demo mode
// import { useSelector } from "react-redux"; // Not used in demo mode
import { Form } from "formik";
import { object, string } from "yup";
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect } from "react";

export const blogSchema = object({
    title: string()
        .max(100, "Title must be less than 100 characters")
        .required("This field is required"),
    content: string().required("This field is required"),
    image: string().max(400, "URL must be less than 400 characters"),
    category: string(),
    status: string(),
});

const NewBlogForm = ({ values, handleChange, errors, touched, handleBlur }) => {
    // Demo mode - use demo categories
    const categories = [
        { name: "Technology", id: 1 },
        { name: "Lifestyle", id: 2 },
        { name: "Travel", id: 3 },
        { name: "Food", id: 4 },
        { name: "Sports", id: 5 },
    ];
    // const { getBlogData } = useBlogCall(); // Not used in demo mode
    // const { categories } = useSelector(state => state.blog); // Not used in demo mode

    useEffect(() => {
        // Demo mode - no API calls needed
        console.log("Demo mode - NewBlogForm loaded with demo categories");
    }, []);
    const [selectedStatus, setSelectedStatus] = useState(
        values.status === "d" ? "draft" : "published"
    );

    useEffect(() => {
        const newStatusValue = selectedStatus === "draft" ? "d" : "p";
        handleChange({
            target: {
                name: "status",
                value: newStatusValue,
            },
        });
    }, [selectedStatus, handleChange]);

    return (
        <div>
            <Form>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                        maxWidth: "500px",
                        minWidth: "350px",
                        maxHeight: "calc(100vh - 200px)",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        p: 3,
                        boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1)",
                        border: "1px solid rgba(99, 102, 241, 0.1)",
                        overflow: "auto",
                    }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        id="title"
                        type="text"
                        variant="outlined"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.title && errors.title}
                        error={touched.title && Boolean(errors.title)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Image URL"
                        name="image"
                        id="image"
                        type="url"
                        variant="outlined"
                        value={values.image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.image && errors.image}
                        error={touched.image && Boolean(errors.image)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                    <FormControl
                        variant="outlined"
                        error={touched.category && Boolean(errors.category)}
                        fullWidth
                    >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Category"
                            helperText={touched.category && errors.category}
                            error={touched.category && Boolean(errors.category)}
                        >
                            <MenuItem value="">Select a category</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {touched.category && errors.category && (
                            <span>{errors.category}</span>
                        )}
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        error={touched.status && Boolean(errors.status)}
                        fullWidth
                    >
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={selectedStatus} // Always use "draft" or "published" as the value
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            onBlur={handleBlur}
                            label="Status"
                        >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                        </Select>

                        {touched.status && errors.status && (
                            <span>{errors.status}</span>
                        )}
                    </FormControl>
                    <TextField
                        label="Content"
                        name="content"
                        id="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.content && Boolean(errors.content)}
                        helperText={touched.content && errors.content}
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                            width: "100%",
                            resize: "vertical",
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
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: 600,
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
                        Create Blog Post
                    </Button>
                </Box>
            </Form>
        </div>
    );
};

export default NewBlogForm;
