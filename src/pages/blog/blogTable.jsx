/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import Chip from '@mui/material/Chip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// third-party
import NumberFormat from 'react-number-format';

// time format
import { formatDistance } from 'date-fns';

// project import
import Dot from 'components/@extended/Dot';

//state imports
import { useSelector } from 'react-redux';

function createData(title, author, date_created, published, tags, views, actions) {
    return { title, author, date_created, published, tags, views, actions };
}

const rows = (data) => {
    const postArray = [];
    data.map((item) => {
        return postArray.push(createData(item.title, item.author, item.date_created, item.published, item.tags, item.views, item.id));
    });
    return postArray;
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Title.'
    },
    {
        id: 'author',
        align: 'left',
        disablePadding: false,
        label: 'Author'
    },
    {
        id: 'date_created',
        align: 'left',
        disablePadding: false,
        label: 'Date created'
    },
    {
        id: 'published',
        align: 'left',
        disablePadding: false,
        label: 'Published'
    },
    {
        id: 'tags',
        align: 'left',
        disablePadding: false,
        label: 'Tags'
    },
    {
        id: 'views',
        align: 'left',
        disablePadding: false,
        label: 'Views'
    },
    {
        id: 'actions',
        align: 'left',
        disablePadding: false,
        label: 'Actions'
    }
];
// ==============================|| STYLED COMPONENTS ||=================================== //

const Tagscontainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 250px;
`;
const TagsTags = styled.p`
    padding: 3px 10px;
    font-size: 8px;
    border-radius: 10px;
    background-color: #0a913dcc;
    color: #fff;
    margin: 0px 5px 3px 0px;
    /* font-weight: 500; */
`;
const TitleLinkContainer = styled.div`
    width: 200px;
    white-space: break-spaces;
    text-transform: lowercase;
    /* font-weight: 500; */
`;
// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Not Published';
            break;
        case 1:
            color = 'success';
            title = 'Published';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

const Tags = ({ tags }) => {
    // eslint-disable-next-line react/prop-types
    const tagArr = tags?.split(',');
    return (
        <Tagscontainer>
            {tagArr?.map((item, i) => {
                return item !== '' && <TagsTags key={i}>{item}</TagsTags>;
            })}
        </Tagscontainer>
    );
};

const TitleLink = ({ text, id }) => {
    // eslint-disable-next-line react/prop-types
    return (
        <TitleLinkContainer>
            <Link color="primary" variant="body2" component={RouterLink} to={`/dashboard/blog/${id}`}>
                {text}
            </Link>
        </TitleLinkContainer>
    );
};

Tags.propTypes = {
    tags: PropTypes.string
};

TitleLink.propTypes = {
    text: PropTypes.string,
    id: PropTypes.number
};
// ==============================|| ORDER TABLE ||============================== //
const actions = [
    { icon: <DeleteIcon />, name: 'Delete' },
    { icon: <EditIcon />, name: 'Edit' }
];

export default function BlogTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);
    const [open, setOpen] = useState(false);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { posts, singlePost, addStatus } = useSelector((state) => state.blogSlice);

    useEffect(() => {
        console.log('blog posts: ', posts);
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const openm = Boolean(anchorEl);

    const handleClickm = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosem = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows(posts), getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.title);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.title + '_' + index}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <TitleLink text={row.title} id={row.actions} />
                                    </TableCell>
                                    <TableCell align="left">{row.author}</TableCell>
                                    <TableCell align="left">
                                        {row?.date_created}
                                        {/* {formatDistance(
                                            new Date(Date.parse(row?.date_created?.replace('-', '/', 'g'))),
                                            new Date(2015, 0, 1)
                                        )} */}
                                    </TableCell>
                                    <TableCell align="left">
                                        <OrderStatus status={row.published} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tags tags={row.tags} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <NumberFormat value={row.views} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                onClick={handleClickm}
                                                aria-controls={openm ? 'amenu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openm ? 'true' : undefined}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu anchorEl={anchorEl} id="amenu" open={openm} onClose={handleClosem} onClick={handleClosem}>
                                                <MenuItem divider={true} sx={{ color: 'red' }}>
                                                    {' '}
                                                    <ListItemIcon>
                                                        <DeleteIcon sx={{ color: 'red' }} />
                                                    </ListItemIcon>
                                                    <Typography color="danger">Delete</Typography>
                                                </MenuItem>
                                                <MenuItem>
                                                    {' '}
                                                    <ListItemIcon>
                                                        <EditIcon sx={{ color: 'blue' }} />
                                                    </ListItemIcon>
                                                    <Typography component={Link} to={`/dashboard/blog/edit/${row.actions}`} color="blue">
                                                        Edit
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
