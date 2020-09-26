const fileReader = new FileReader();

export const read = (file: File): Promise<ArrayBuffer | string> =>
  new Promise((resolve, reject) => {
    fileReader.onerror = (e) => reject(e);

    fileReader.onload = (e) => resolve(e.target && e.target.result ? e.target.result : "");

    fileReader.readAsText(file);
  });
