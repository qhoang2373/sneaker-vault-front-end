const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/sneakers`;

const index = async () => {
    try {
        const res = await fetch (BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
      console.log(error)
    }
  };

  const show = async (sneakerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${sneakerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
      } catch (error) {
        console.log(error)
      }
    };

    const create = async (sneakerFormData) => {
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sneakerFormData),
        });
        return res.json();
      } catch (error) {
        console.log(error)
      }
    };

    const createComment = async (sneakerId, commentFormData) => {
      try {
        const res = await fetch(`${BASE_URL}/${sneakerId}/comments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentFormData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };

    const deleteSneaker = async (sneakerId) => {
      try {
        const res = await fetch(`${BASE_URL}/${sneakerId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };


    async function update(sneakerId, sneakerFormData) {
      try {
        const res = await fetch(`${BASE_URL}/${sneakerId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sneakerFormData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    }
    
    export { index, show, create, createComment, deleteSneaker, update};
    
