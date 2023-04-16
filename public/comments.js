const commentFormHandler = async (event) => {
    event.preventDefault();
    
    const postId = window.location.pathname.split('/').pop();
    const content = await document.querySelector('#commentText').value.trim();

    if (content) {
        const response = await fetch(`/api/comment/${postId}`, {
            method: 'POST',
            body: JSON.stringify({
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(response.status)
        if (response.ok) {
            document.location.reload();
        } else {
            alert('failed to create a new comment')
        }
    }
};

let commentSubmit = document.querySelector('#commentForm');
commentSubmit.addEventListener('submit', commentFormHandler);