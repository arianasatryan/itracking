document.addEventListener('DOMContentLoaded', function() {
    const imageUploadForm = document.getElementById('imageUploadForm');
    const videoUploadForm = document.getElementById('videoUploadForm');
    const imageFileInput = document.getElementById('imageFileInput');
    const videoFileInput = document.getElementById('videoFileInput');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');

    // Initially hide the video player container
    videoPlayerContainer.style.display = 'none';

    // Function to handle image upload
    async function handleImageUpload(event) {
        event.preventDefault();
        
        const file = imageFileInput.files[0];
        if (!file) {
            // alert('Please select an image file.');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/upload/image', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Handle successful upload response for image
                const imageData = await response.blob();
                const imageUrl = URL.createObjectURL(imageData);

                // Display the uploaded image in the same container
                videoPlayerContainer.innerHTML = ''; // Clear previous content
                const uploadedImage = document.createElement('img');
                uploadedImage.src = imageUrl;
                uploadedImage.style.maxWidth = '100%';
                uploadedImage.style.maxHeight = '100%';
                videoPlayerContainer.appendChild(uploadedImage);
                
                // Show the container
                videoPlayerContainer.style.display = 'flex';
                // alert('Image uploaded successfully!');
            } else {
                // Handle upload error response for image
                const errorMessage = await response.text();
                console.error('Failed to upload image:', errorMessage);
                // alert(`Failed to upload image: ${errorMessage}`);
            }
        } catch (error) {
            // Handle fetch error for image
            console.error('Error:', error);
            // alert('An error occurred while uploading the image.');
        }
    }

    // Function to handle video upload
    async function handleVideoUpload(event) {
        event.preventDefault();
        
        const file = videoFileInput.files[0];
        if (!file) {
            // alert('Please select a video file.');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/upload/video', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Handle successful upload response for video
                const videoBlob = await response.blob();
                videoPlayer.src = URL.createObjectURL(videoBlob);
                videoPlayerContainer.innerHTML = ''; // Clear previous content
                videoPlayerContainer.appendChild(videoPlayer);
                videoPlayerContainer.style.display = 'flex'; // Show video container
                // alert('Video uploaded successfully!');
            } else {
                // Handle upload error response for video
                const errorMessage = await response.text();
                console.error('Failed to upload video:', errorMessage);
                // alert(`Failed to upload video: ${errorMessage}`);
            }
        } catch (error) {
            // Handle fetch error for video
            console.error('Error:', error);
            // alert('An error occurred while uploading the video.');
        }
    }

    // Assigning the functions to their respective form submissions
    imageUploadForm.addEventListener('submit', handleImageUpload);
    videoUploadForm.addEventListener('submit', handleVideoUpload);
});
