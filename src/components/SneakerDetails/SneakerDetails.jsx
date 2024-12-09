import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as sneakerService from '../../services/sneakerService'
import CommentForm from "../CommentForm/CommentForm";
import { AuthedUserContext } from "../../App";
import styles from './SneakerDetails.module.css';



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

    if (!sneaker) return <main>Loading...</main>; 
    
    return (
      <main className={styles.container}>
        <section>
          <header>
              <p>{sneaker.brand.toUpperCase()}</p>
              <h1>{sneaker.name}</h1>

            <div>
              <p>
                  {sneaker.author.username} posted on
                  {new Date(sneaker.createdAt).toLocaleDateString()}
              </p>
              {sneaker.author._id === user._id && (
                  <>
                      <Link to={`/sneakers/${sneakerId}/edit`}>Edit</Link>
                      <button onClick={() => {props.handleDeleteSneaker(sneakerId)}}>
                        Delete
                        </button>
                  </>
              )}
            </div>

          </header>
          <p>{sneaker.description}</p>
          </section>

          <section>
            <h2>Comments</h2>
            <CommentForm handleAddComment={handleAddComment} /> 
            {!sneaker.comments.length && <p>No Comments</p>}
            {sneaker.comments.map((comment) => {

                 return (
                   <article key={comment._id}>
                   <header>
                   <div>

                     <p>
                        {comment.author.username} posted on
                     {new Date(comment.createdAt).toLocaleDateString()}
                     </p>
                     </div>

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


