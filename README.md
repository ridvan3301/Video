<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resimlerden Animasyon Oluştur</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
        }
        .image-preview {
            margin-top: 20px;
        }
        .video-container {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Resimlerden Animasyon Oluştur</h1>
        <input type="file" id="imageInput" multiple accept="image/*">
        <div id="imagePreview" class="image-preview"></div>
        <button id="createAnimationButton">Animasyon Oluştur</button>
        <div id="animationContainer" class="video-container"></div>
    </div>

    <script>
        const imageInput = document.getElementById('imageInput');
        const imagePreview = document.getElementById('imagePreview');
        const createAnimationButton = document.getElementById('createAnimationButton');
        const animationContainer = document.getElementById('animationContainer');

        let images = [];

        imageInput.addEventListener('change', function(event) {
            const files = event.target.files;
            imagePreview.innerHTML = '';
            images = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.margin = '5px';
                    imagePreview.appendChild(img);
                    images.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        createAnimationButton.addEventListener('click', function() {
            if (images.length === 0) {
                alert('Lütfen önce resimler yükleyin.');
                return;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            animationContainer.innerHTML = '';
            animationContainer.appendChild(canvas);

            let currentFrame = 0;
            const frameDuration = 5000; // Her resmin gösterileceği süre (ms)

            function drawFrame() {
                const img = new Image();
                img.src = images[currentFrame];
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    currentFrame = (currentFrame + 1) % images.length;
                    setTimeout(drawFrame, frameDuration);
                };
            }

            drawFrame();
        });
    </script>
</body>
</html>
