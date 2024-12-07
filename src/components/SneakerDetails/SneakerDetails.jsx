import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as sneakerService from '../../services/sneakerService'
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";




const SneakerDetails = (props) => { // sneakerdetails component will be used to show details about specific SNKRS
  const { sneakerId } = useParams(); // hook used to extract sneakerId from the URL and used to fetch SNKR from back end
   const [sneaker, setSneaker] = useState(null) // this will store the fetched data
   const user = useContext(AuthedUserContext); // access user data from line 5

    useEffect(() => { 
        const fetchSneaker = async () => { 
          const sneakerData = await sneakerService.show(sneakerId); // fetches details of a SNKR's sneakerId
          setSneaker(sneakerData); // setSneaker updates the value of the 
        };
        fetchSneaker();
      }, [sneakerId]);
    
    
    const handleAddComment = async (commentFormData) => {
        const newComment = await sneakerService.createComment(sneakerId, commentFormData);
        setSneaker({ ...sneaker, comments: [...sneaker.comments, newComment] });
    };

    if (!sneaker) return <main>Loading...</main>; // checks if sneaker os falsy, if it is then condition is true
    
    return (
        <main>
          <header>
            <p>{sneaker.brand.toUpperCase()}</p> 
            <h1>{sneaker.name}</h1> 
            <p>
              {sneaker.username} posted on
              {new Date(sneaker.createdAt).toLocaleDateString()}
            </p>
              {sneaker._id === user._id && ( // checks if the user's ID matches the SNKR author's ID
                <>
                 <Link to={`/sneakers/${sneakerId}/edit`}>Edit</Link>
                  <button onClick={() => {props.handleDeleteSneaker(sneakerId)}}>Delete</button>
                </>

              )}
        </header>

          <p>{sneaker.description}</p>
          <section>
            <h2>Comments</h2>
            <CommentForm handleAddComment={handleAddComment} /> 
            {!sneaker.comments.length && <p>No Comments</p>}
            {sneaker.comments.map((comment) => {

                 return (
                   <article key={comment._id}>
                   <header>
                     <p>
                     {comment.author.username} posted on
                     {new Date(comment.createdAt).toLocaleDateString()}
                     </p>
                    </header>
                    <p>{comment.comment}</p>
                  </article>
                )
            })}
        </section>
      </main>
    );
  };
    
  export default SneakerDetails;

