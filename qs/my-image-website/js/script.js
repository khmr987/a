document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    
    images.forEach(image => {
        image.addEventListener('click', function() {
            const expandedImage = document.createElement('img');
            expandedImage.src = this.src;
            expandedImage.classList.add('expanded');
            document.body.appendChild(expandedImage);
            
            expandedImage.addEventListener('click', function() {
                document.body.removeChild(expandedImage);
            });
        });
    });
});