import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns }, props) => {
    return (
        <>
            <DataGrid
                autoHeight
                disableSelectionOnClick
                autoPageSize
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={false}
                disableExtendRowFullWidth={true}
                {...props}
            />
        </>
    );
};

export default Table;
