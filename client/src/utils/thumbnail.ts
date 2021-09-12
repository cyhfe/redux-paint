type ThumbnailArgs = {
  file: Blob;
  scale: number;
};

export function getBase64Thumbnail({
  file,
  scale = 0.1,
}: ThumbnailArgs): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const el = document.createElement("canvas");
        let w = (el.width = img.width * scale);
        let h = (el.height = img.height * scale);
        const ctx = el.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);
        return resolve(el.toDataURL());
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => {
      return reject(err.toString());
    };
  });
}
