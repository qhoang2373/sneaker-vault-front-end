import { useState, useEffect } from 'react';
import styles from './CommentForm.module.css';


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '' });
      };



      
      // if (sneakerId && commentId) return (
      //   <main className={styles.container}>
      //     <form onSubmit={handleSubmit}>
      //       <h1>Edit Comment</h1>
      //       <label htmlFor="comment-input">Your comment:</label>
      //       <textarea
      //         required
      //         type="comment"
      //         name="comment "
      //         id="comment-input"
      //         value={formData.comment}
      //         onChange={handleChange}
      //       />
      //       <button type="submit">SUBMIT</button>
      //     </form>
      //   </main>
      // );

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
          <button type="submit">Submit Comment</button>
        </form>
      );
    };

  export default CommentForm;


