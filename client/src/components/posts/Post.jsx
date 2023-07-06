import React from 'react';
import './post.scss';

const Post = ({ title }) => {

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Do something with the image file
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <input type="file" id="imageInput" onChange={handleImageChange} accept="image/*" />
      <label htmlFor="imageInput">Choose Image</label>
    </div>
  );
};

export default Post;
