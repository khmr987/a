document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');

    fetch('/images/') // Fetch the list of files from the 'images' directory
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const links = htmlDoc.querySelectorAll('a');

            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href.match(/\.(jpe?g|png|gif)$/i)) { // Filter for image files
                    const img = document.createElement('img');
                    img.src = '/images/' + href;
                    gallery.appendChild(img);
                }
            });
        });
});
