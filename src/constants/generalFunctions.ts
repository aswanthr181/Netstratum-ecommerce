export const base64 = (img: File,callback: (result: string | ArrayBuffer | null) => void) => {
    let reader = new FileReader();
    console.log('first')
    reader.readAsDataURL(img)
    reader.onload = () => {
        console.log('bsbsbsbsb',reader.result);
        
        callback(reader.result);
    };
    reader.onerror = (error) => {
        console.log("Error: ", error);
    };
}

