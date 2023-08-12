import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  message,
  autherprofile,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to convert the time to Indian Standard Time (IST)
  const getIndianStandardTime = (utcTime) => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(utcTime).toLocaleString("en-IN", options);
  };

  const formattedTime = getIndianStandardTime(time);

  return (
    <Card
      sx={{
        width: "70%",
        height:"50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={formattedTime} 
      />
      <CardMedia component="img" height="300" image={image} alt="image not found" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
        <h3 style={{color:"green", display: "inline"}}>Title</h3> : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <h3 style={{color:"green", display: "inline"}}>Description</h3> : {description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <h3 style={{color:"green", display: "inline"}}>Message</h3> : {message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <h3 style={{color:"green", display: "inline"}}>Best resources</h3> : {autherprofile}
        </Typography>
      </CardContent>
    </Card>
  );
}
