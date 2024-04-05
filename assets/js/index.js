function checkAtLeastOneModelChecked() {
    var modelSwitches = document.querySelectorAll('.switch-checkbox');
    var modelChecked = false;
    for (var i = 0; i < modelSwitches.length; i++) {
        if (modelSwitches[i].checked) {
            modelChecked = true;
            break;
        }
    }
    if (!modelChecked) {
        modelSwitches[0].checked = true;
    }
}

function getActiveModelValue() {
    var activeModelSwitch = document.querySelector('.switch-checkbox:checked');
    return activeModelSwitch ? activeModelSwitch.id : null;
}

async function handleImageUpload(event) {
    event.preventDefault();
    const file = imageFileInput.files[0];
    if (!file) {
        return;
    }
    videoPlayerContainer.innerHTML = '';
    try {
        const formData = new FormData();
        const activeModel = getActiveModelValue();
        alert(activeModel)
        if (activeModel) {
            formData.append('activeModel', activeModel);
        }
        const response = await fetch('/upload/image', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const imageData = await response.blob();
            const imageUrl = URL.createObjectURL(imageData);

            const uploadedImage = document.createElement('img');
            uploadedImage.src = imageUrl;
            uploadedImage.style.maxWidth = '100%';
            uploadedImage.style.maxHeight = '100%';
            videoPlayerContainer.appendChild(uploadedImage);
            videoPlayerContainer.style.display = 'flexbox';
            // alert('Image uploaded successfully!');
        } else {
            const errorMessage = await response.text();
            console.error('Failed to upload image:', errorMessage);
            // alert(`Failed to upload image: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}