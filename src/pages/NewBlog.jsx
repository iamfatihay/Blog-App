import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NewBlogForm, { blogSchema } from "../components/blog/NewBlogForm";
// import useBlogCalls from "../hooks/useBlogCalls"; // Not used in demo mode
import { Helmet } from "react-helmet";

const NewBlog = () => {
    // const { postBlogData } = useBlogCalls(); // Not used in demo mode

    return (
        <Grid
            sx={{
                background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%), url(https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                height: "calc(100vh - 120px)", // Subtract header height + extra padding
            }}
        >
            <Helmet>
                <title>New Blog</title>
            </Helmet>
            <Grid
                container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    p: 2,
                    m: "auto",
                    maxWidth: "550px",
                    width: "100%",
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: "black",
                        m: "auto",
                        width: 40,
                        height: 40,
                        mt: 2,
                    }}
                >
                    <PostAddIcon size="10" />
                </Avatar>
                <Typography
                    variant="h4"
                    align="center"
                    color="black"
                    sx={{ mb: 3 }}
                >
                    New Blog
                </Typography>

                <Formik
                    initialValues={{
                        title: "",
                        content: "",
                        image: "",
                        category: "",
                        status: "",
                    }}
                    validationSchema={blogSchema}
                    onSubmit={(values, actions) => {
                        // Demo mode - just show success message
                        console.log(
                            "Demo mode - Blog would be created:",
                            values
                        );
                        alert(
                            "Demo mode: Blog post created successfully! (This is just a demo)"
                        );
                        actions.resetForm();
                    }}
                    component={(props) => <NewBlogForm {...props} />}
                ></Formik>
            </Grid>
        </Grid>
    );
};

export default NewBlog;
