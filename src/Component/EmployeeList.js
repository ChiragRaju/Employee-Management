import { Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateEmployee, GetAllEmployees, GetEmployeeCode, RemoveEmployee, UpdateEmployee } from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import CloseIcon from "@mui/icons-material/Close"

const Employee = (props) => {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'age', name: 'Age' },
        {id:'designation', name: 'Designation' },
        {id:'salary', name: 'Salary'},
        { id: 'action', name: 'Action' }
    ]

    const dispatch = useDispatch();

    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [age, agechange] = useState('');
    const [designation, designationchange] = useState('');
    const [salary, salarychange] = useState('');
   
    const [open, openchange] = useState(false);
   

    const [rowperpage, rowperpagechange] = useState(5);
    const [page, pagechange] = useState(0);

    const [isedit, iseditchange] = useState(false);
    const [title, titlechange] = useState('Create company');

    const editobj = useSelector((state) => state.employee.employeeobj);

    useEffect(() => {
        if (Object.keys(editobj).length > 0) {
            idchange(editobj.id);
            namechange(editobj.name);
            agechange(editobj.age);
            designationchange(editobj.designation);
            salarychange(editobj.salary);
            
        } else {
            clearstate();
        }

    }, [editobj])

    const handlepagechange = (event, newpage) => {
        pagechange(newpage);
    }

    const handlerowperpagechange = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    }

    const functionadd = () => {
        iseditchange(false);
        titlechange('Create company');
        openpopup();
    }
    const closepopup = () => {
        openchange(false);
    }
    const openpopup = () => {
        openchange(true);
        clearstate();
        dispatch(OpenPopup())
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const _obj = { id,name,age,designation,salary };
        if (isedit) {
            dispatch(UpdateEmployee(_obj));
        } else {
            dispatch(CreateEmployee(_obj));
        }
        closepopup();
    }

    const handleEdit = (code) => {
        iseditchange(true);
        titlechange('Update company');
        openchange(true);
        dispatch(GetEmployeeCode(code))
    }

    const handleRemove = (code) => {
        if (window.confirm('Do you want to remove?')) {
            dispatch(RemoveEmployee(code));
        }
    }


    const clearstate = () => {
        idchange(0);
        namechange('');
        agechange('');
       designationchange('');
       salarychange('');
    }
    useEffect(() => {
        props.loademployee();
    }, [])
    return (
        props.employeestate.isloading ? <div><h2>Loading.....</h2></div> :
        props.employeestate.errormessage ? <div><h2>{props.employeestate.errormessage}</h2></div> :
            <div>
                <Paper sx={{ margin: '1%',backgroundColor:'#edede9' }}>
                    <div style={{ margin: '1%' }}>
                        <Button onClick={functionadd} variant="contained">Add New (+)</Button>
                    </div>
                    <div style={{ margin: '1%' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow  style={{ backgroundColor: '#0d3b66'}}>
                                        {columns.map((column) =>
                                            <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                        )}
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {props.employeestate.employeelist &&
                                        props.employeestate.employeelist
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.age}</TableCell>
                                                        <TableCell>{row.designation}</TableCell>
                                                        <TableCell>{row.salary}</TableCell>
    
                                                        <TableCell>
                                                           <Button onClick={e => { handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                            <Button onClick={e => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10, 20]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={props.employeestate.employeelist.length}
                            component={'div'}
                            onPageChange={handlepagechange}
                            onRowsPerPageChange={handlerowperpagechange}
                        >

                        </TablePagination>
                    </div>
                </Paper>

                <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                    <DialogTitle  style={{backgroundColor:"#0d3b66"}}>
                        <span style={{color:'white'}}>{title}</span>
                        <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handlesubmit} >
                            <Stack spacing={2} margin={2}>
                                <TextField required error={name.length === 0} value={name} onChange={e => { namechange(e.target.value) }} variant="outlined" label="Name"></TextField>
                                <TextField required error={age.length === 0} value={age} onChange={e => { agechange(e.target.value) }} variant="outlined" label="Age"></TextField>
                                <TextField required error={designation.length === 0} value={designation} onChange={e => { designationchange(e.target.value) }} variant="outlined" label="Designation"></TextField>
                                <TextField required error={salary.length===0} value={salary} onChange={e => { salarychange(e.target.value) }} variant="outlined" label="Salary"></TextField>
                               
                                <Button  variant="contained" type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
    );
}

const mapStatetoProps = (state) => {
    return {
        employeestate: state.employee
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        loademployee: () => dispatch(GetAllEmployees())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Employee);