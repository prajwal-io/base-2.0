const photos: Partial<Record<string, { width: number; height: number; alt: string; format?: "jpg" }>> = {
  "01": { width: 1080, height: 1361, alt: "Collage of the BacktoBase group and speakers", format: "jpg" },
  "02": { width: 1080, height: 1370, alt: "Two group photos from BacktoBase Edition 02" },
  "03": { width: 502, height: 206, alt: "BacktoBase attendees posing in an auditorium" },
  "04": { width: 800, height: 1000, alt: "Collage of the Edition 04 group and presentations" },
  "05": { width: 1535, height: 862, alt: "Group selfie at BacktoBase Edition 05" },
  "06": { width: 640, height: 800, alt: "Edition 06 group photo and three speakers" },
  "07": { width: 1531, height: 862, alt: "BacktoBase attendees posing together at Edition 07" },
  "08": { width: 1457, height: 755, alt: "Group photo labeled BacktoBase Edition 8" },
  "09": { width: 462, height: 218, alt: "BacktoBase group in an auditorium beneath the words We are BacktoBase" },
};

export function getEditionPhoto(editionNumber: string) {
  const photo = photos[editionNumber];
  if (!photo) return undefined;

  return {
    src: `/images/editions/${editionNumber}/photo.${photo.format ?? "png"}`,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
  };
}
