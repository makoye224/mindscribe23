import React, { useState } from "react";
import { Box, IconButton, Popover, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomButton from "./CustomButton";
import { useStateContext } from "../context/context";
import { ColorRing } from "react-loader-spinner";

const MoreIcon = ({ label }) => {
  const { deleteLabel, editLabel, addEntryToLabel, fetchLabels } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newLabel, setNewLabel] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await editLabel(label.id, newLabel);
      fetchLabels()
      console.log(response)
      setEdit(false)
    }
    catch(err){
      console.error(err)
    }
    finally{
      
    }
   
    
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteLabel(label.id);
      fetchLabels()
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setEdit(true)
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2} minWidth={200}>
          <Typography
            variant="h6"
            gutterBottom
            className="text-center uppercase"
          >
            {label.name}
          </Typography>
          <CustomButton
            variant="contained"
            onClick={handleDelete}
            fullWidth
            className="mb-1"
          >
            Delete Label
          </CustomButton>
          <CustomButton
            onClick={handleEdit}
            variant="contained"
            fullWidth
            className="mb-1"
          >
            Edit Label
          </CustomButton>
          {edit &&
          <div>
            <form onSubmit={handleSubmit}>
              <label>Name of new label</label>
              <input type="text" value={newLabel} onChange={(e)=>setNewLabel(e.target.value)} required className="form-control"/>
              <br/>
              <CustomButton type = 'submit' variant='contained'>submit</CustomButton>
            </form>
          </div>
          }
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading && (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>
        </Box>
      </Popover>
    </>
  );
};

export default MoreIcon;
