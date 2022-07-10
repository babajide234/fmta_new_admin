/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { TextField, Grid, Box, Container, Button, Alert } from '@mui/material';
// import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
// import { addBlogPost } from '../../app/blogSlice';
import { addBlogPost } from 'store/reducers/blog';
import { toast } from 'react-toastify';

import SunEditor from 'suneditor-react';

const AddBlog = () => {
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // edit and add forms
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [postbody, setpostbody] = useState('');
    const [postimage, setpostimage] = useState('');
    const [postimageuri, setpostimageuri] = useState('');

    const editorRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addStatus } = useSelector((state) => state.blogSlice);

    // Create a Slate editor object that won't change across renders.
    // const editor = useState(() => withReact(createEditor()));
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handlePostSubmit = async () => {
        // setpostbody(editorRef.current.getContent());

        if (title === '' && subtitle === '' && body === '') {
            setError('Please fill all the fields');
            toast.warn('Please fill all the fields');
            console.log('Please fill all the fields');
        } else {
            setLoading(true);
            const fData = new FormData();
            fData.append('title', title);
            fData.append('subtitle', subtitle);
            fData.append('body', postbody);
            fData.append('image', postimage);
            fData.append('author', 'admin');
            fData.append('body', 0);
            fData.append('dislikes', 0);
            fData.append('fav', 0);
            fData.append('hidden', 0);
            fData.append('likes', 0);
            fData.append('new', 0);
            fData.append('published', 0);
            fData.append('views', 0);
            const response = await dispatch(addBlogPost(fData));
            if (response.status === 200) {
                setLoading(false);
                setOpen(true);
                setSuccess('Blog post added successfully');
                toast.success(success);
                setTimeout(() => {
                    navigate('/dashboard/blog');
                }, 1000);
            } else {
                setLoading(false);
                setError('Something went wrong');
                toast.warn('Something went wrong');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        }
    };

    const handleFileChange = (event) => {
        setpostimage(event);
        console.log('image: ', postimage);
    };
    const handleChange = (event) => {
        console.log(event);
        setpostbody(event);
    };
    const editor = useRef();

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    return (
        <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Grid container item spacing={3} sx={{ width: '70%', paddingTop: 5 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            name=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Subtitle"
                            name=""
                            variant="outlined"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth type="file" id="formFile" name="image" onChange={(e) => handleFileChange(e.target.files[0])} />
                    </Grid>
                    <Grid item xs={12}>
                        <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            height="40vh"
                            placeholder="Please type here..."
                            defaultValue="<p>The editor's default value</p>"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handlePostSubmit} variant="contained" color="primary" size="large">
                            Create Post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AddBlog;
