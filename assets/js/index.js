document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');

    // Set initial checkbox states
    document.getElementById('FaceRadio').checked = true;
    document.getElementById('BoxesCheckbox').checked = true;
    document.getElementById('KeypointsCheckbox').checked = true;
    
    // Add event listeners to checkboxes for validation
    const checkboxes = document.querySelectorAll('.option-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateCheckboxes);
    });

    // Validate checkboxes
    function validateCheckboxes() {
        console.log('Validating checkboxes');
        const checkboxes = document.querySelectorAll('.option-checkbox');
        let checked = false;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checked = true;
            }
        });
        if (!checked) {
            alert('At least one option must be selected.');
        }
    }

    function showLoadingSpinner(itemid) {
        const loadingSpinnerHTML = `
            <div id="loadingSpinner" class="multi-spinner-container">
                <div class="multi-spinner"></div>
            </div>`;
        const item = document.getElementById(itemid);
        item.innerHTML = loadingSpinnerHTML;

        item.style.display = 'flex';
        item.style.justifyContent = 'center';
        item.style.alignItems = 'center';    
    }

    function hideLoadingSpinner() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.remove();
        }
    }

    function getActiveModel() {
        var activeModelSwitch = document.querySelector('.switch-radio:checked');
        return activeModelSwitch ? activeModelSwitch.id : null;
    }

    function getActiveOptions() {
        const checkboxes = document.querySelectorAll('.option-checkbox:checked');
        const activeOptions = [];
        checkboxes.forEach(checkbox => {
            activeOptions.push(checkbox.id);
        });
        return activeOptions;
    }

    document.getElementById('imageFileInput').addEventListener('change', async function(event) {
        console.log('Image file input change event fired');
        const file = event.target.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }
    
        console.log('Selected file:', file);
        const imageCard = document.querySelector('.image-card .drop_box');
        imageCard.style.backgroundColor = '#f2f7ff';

        const reader = new FileReader();
    
        reader.onload = async function(e) {
            const uploadedImage = document.createElement('img');
            uploadedImage.src = e.target.result;
    
            // Create the image column elements dynamically
            const uploadedImageColumn = document.createElement('div');
            uploadedImageColumn.classList.add('image-column');
            uploadedImageColumn.id = 'uploadedImageColumn';
            uploadedImageColumn.appendChild(uploadedImage);
    
            const processedImageColumn = document.createElement('div');
            processedImageColumn.classList.add('image-column');
            processedImageColumn.id = 'processedImageColumn';
    
            // Clear any existing content in the player container
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.innerHTML = '';
            playerContainer.appendChild(uploadedImageColumn);
            playerContainer.appendChild(processedImageColumn);
    
            showLoadingSpinner('processedImageColumn');

            console.log("playerContainer", playerContainer)
    
            try {
                const activeModel = getActiveModel();
                const activeOptions = getActiveOptions();
                console.log('Active model:', activeModel);
                console.log('Active activeOptions:', activeOptions);

                const formData = new FormData();
                formData.append('activeModel', activeModel);
                activeOptions.forEach(option => {
                    formData.append('activeOptions', option);
                });
                formData.append('file', file);

                const response = await fetch('/upload/image', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const responseData = await response.blob();
                    const responseImageUrl = URL.createObjectURL(responseData);
                    const responseImage = document.createElement('img');
                    responseImage.style.maxWidth = '100%';
                    responseImage.style.maxHeight = '100%';
                    responseImage.src = responseImageUrl;
    
                    processedImageColumn.innerHTML = '';
                    processedImageColumn.appendChild(responseImage);
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to upload image:', errorMessage);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                hideLoadingSpinner();
                imageCard.style.backgroundColor = 'transparent';
            }
        };
        reader.readAsDataURL(file);
    });
    
    document.getElementById('videoFileInput').addEventListener('change', async function(event) {
        console.log('Video file input change event fired');
        const file = event.target.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }
    
        console.log('Selected file:', file);
        const videoCard = document.querySelector('.video-card .drop_box');
        videoCard.style.backgroundColor = '#f2f7ff';
    
        // Check if the download container already exists
        let playerContainer = document.querySelector('.player-container');
        if (!playerContainer) {
            // If the download container does not exist, create a new one
            playerContainer = document.createElement('div');
            playerContainer.id = 'playerContainer';
            playerContainer.classList.add('player-container');
            document.body.appendChild(playerContainer);
        } else {
            // If the download container already exists, clear its contents
            playerContainer.innerHTML = '';
        }
        console.log("Video playercontaner", playerContainer)
    
        // Show the loading spinner
        showLoadingSpinner('playerContainer')

        try {
            const activeModel = getActiveModel();
            const activeOptions = getActiveOptions();
            console.log('Active model:', activeModel);
            console.log('Active activeOptions:', activeOptions);
    
            const formData = new FormData();
            formData.append('activeModel', activeModel);
            activeOptions.forEach(option => {
                formData.append('activeOptions', option);
            });
            formData.append('file', file);
    
            const response = await fetch('/upload/video', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // Set the source of the video
                const videoBlob = await response.blob();
                console.log('Video Blob:', videoBlob); // Log the blob
                const videoUrl = URL.createObjectURL(videoBlob);
    
                // Create a download button for the processed video
                const downloadButton = document.createElement('a');
                downloadButton.textContent = 'Download Result';
                downloadButton.href = videoUrl;
                downloadButton.classList.add('custom-file-upload');

                const fileName = file.name;
                downloadButton.download = fileName;
                
                // Append the download button to the player container
                playerContainer.appendChild(downloadButton);
            } else {
                const errorMessage = await response.text();
                console.error('Failed to upload video:', errorMessage);
                // Log the response content
                console.log('Response content:', errorMessage);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally{
            hideLoadingSpinner();
            videoCard.style.backgroundColor = 'transparent';
        }
    });
    
});