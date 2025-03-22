document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('imageGallery');
    const uploadButton = document.getElementById('uploadButton');
    const imageUpload = document.getElementById('imageUpload');

    // Function to load images from the server
    async function loadImages() {
        try {
            const response = await fetch('/images'); // Assuming your server route is /images
            const images = await response.json();

            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `images/${image}`;
                gallery.appendChild(img);
            });
        } catch (error) {
            console.error('Error loading images:', error);
        }
    }

    loadImages();

    uploadButton.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('/upload', { // Assuming your server route is /upload
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Image uploaded successfully');
                    gallery.innerHTML = ''; // Clear the gallery
                    loadImages(); // Reload images
                } else {
                    console.error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    });
});