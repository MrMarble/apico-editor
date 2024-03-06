function downloadURL(data: string, fileName: string) {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.append(a);
  a.style.display = "none";
  a.click();
  a.remove();
}

function downloadBlob(data: string, fileName: string, mimeType: string) {
  const blob = new Blob([data], {
    type: mimeType,
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL(url, fileName);

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

export default downloadBlob;
