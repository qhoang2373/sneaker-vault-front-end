import { useState, useEffect } from 'react';

import * as sneakerService from '../../services/sneakerService';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
      };

      const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '' });
      };

      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment-input">Your comment:</label>
          <textarea
            required
            type="comment"
            name="comment"
            id="comment-input"
            value={formData.comment}
            onChange={handleChange}
          />
          <button type="submit">SUBMIT COMMENT</button>
        </form>
      );
    };

    export default CommentForm;
