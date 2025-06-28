async function sendToDID() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Lütfen bir fotoğraf yükleyin.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result.split(',')[1];

    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": "Bearer ‎bWVyc2lubGFib3JhdHV2YXIzM0BnbWFpbC5jb20:awLM3YEwvuvNOfBgc3P8X",  // Buraya D-ID API anahtarını yaz
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        script: {
          type: "text",
          input: "Merhaba, ben bir yapay zeka tarafından konuşturuluyorum."
        },
        source_url: `data:image/jpeg;base64,${base64Image}`
      })
    });

    const result = await response.json();
    const video = document.getElementById('resultVideo');
    video.src = `https://api.d-id.com/talks/${result.id}/video`;
  };

  reader.readAsDataURL(file);
}
