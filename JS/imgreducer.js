 // Mobile Menu Toggle
 const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
 const navLinks = document.querySelector(".nav-links");

 mobileNavToggle.addEventListener("click", () => {
   navLinks.classList.toggle("active");
   const icon = mobileNavToggle.querySelector("i");
   if (icon.classList.contains("fa-bars")) {
     icon.classList.remove("fa-bars");
     icon.classList.add("fa-times");
   } else {
     icon.classList.remove("fa-times");
     icon.classList.add("fa-bars");
   }
 });
// DOM Elements
const uploadArea = document.getElementById('upload-area');
   const fileInput = document.getElementById('file-input');
   const previewContainer = document.getElementById('preview-container');
   const previewImage = document.getElementById('preview-image');
   const widthInput = document.getElementById('width-input');
   const heightInput = document.getElementById('height-input');
   const maintainRatio = document.getElementById('maintain-ratio');
   const qualitySlider = document.getElementById('quality-slider');
   const qualityValue = document.getElementById('quality-value');
   const resetBtn = document.getElementById('reset-btn');
   const downloadBtn = document.getElementById('download-btn');
   const originalSizeEl = document.getElementById('original-size');
   const newSizeEl = document.getElementById('new-size');
   const reductionPercentageEl = document.getElementById('reduction-percentage');
   
   // Variables
   let originalImage;
   let originalWidth;
   let originalHeight;
   let aspectRatio;
   let originalSize;
   let newSize = 0;
   
   // Event listeners
   uploadArea.addEventListener('click', () => fileInput.click());
   
   uploadArea.addEventListener('dragover', (e) => {
       e.preventDefault();
       uploadArea.style.borderColor = '#2563eb';
       uploadArea.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
   });
   
   uploadArea.addEventListener('dragleave', (e) => {
       e.preventDefault();
       uploadArea.style.borderColor = '#94a3b8';
       uploadArea.style.backgroundColor = '#f1f5f9';
   });
   
   uploadArea.addEventListener('drop', (e) => {
       e.preventDefault();
       uploadArea.style.borderColor = '#94a3b8';
       uploadArea.style.backgroundColor = '#f1f5f9';
       
       if (e.dataTransfer.files.length) {
           fileInput.files = e.dataTransfer.files;
           handleFileUpload();
       }
   });
   
   fileInput.addEventListener('change', handleFileUpload);
   
   widthInput.addEventListener('input', () => {
       if (maintainRatio.checked) {
           heightInput.value = Math.round(widthInput.value / aspectRatio);
       }
       updateImagePreview();
   });
   
   heightInput.addEventListener('input', () => {
       if (maintainRatio.checked) {
           widthInput.value = Math.round(heightInput.value * aspectRatio);
       }
       updateImagePreview();
   });
   
   qualitySlider.addEventListener('input', (e) => {
       qualityValue.textContent = `${e.target.value}%`;
       updateImagePreview();
   });
   
   resetBtn.addEventListener('click', resetValues);
   
   downloadBtn.addEventListener('click', downloadImage);
   
   // Functions
   function handleFileUpload() {
       const file = fileInput.files[0];
       
       if (file && file.type.startsWith('image/')) {
           const reader = new FileReader();
           
           reader.onload = (e) => {
               // Store original file size
               originalSize = file.size;
               originalSizeEl.textContent = formatFileSize(originalSize);
               
               // Create image object
               originalImage = new Image();
               originalImage.src = e.target.result;
               
               originalImage.onload = () => {
                   // Set original dimensions
                   originalWidth = originalImage.width;
                   originalHeight = originalImage.height;
                   aspectRatio = originalWidth / originalHeight;
                   
                   // Update inputs
                   widthInput.value = originalWidth;
                   heightInput.value = originalHeight;
                   
                   // Show preview
                   previewImage.src = e.target.result;
                   previewContainer.style.display = 'block';
                   
                   updateImagePreview();
               };
           };
           
           reader.readAsDataURL(file);
       }
   }
   
   function updateImagePreview() {
       if (!originalImage) return;
       
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
       
       // Set dimensions
       const width = parseInt(widthInput.value) || originalWidth;
       const height = parseInt(heightInput.value) || originalHeight;
       
       canvas.width = width;
       canvas.height = height;
       
       // Draw image with quality
       ctx.drawImage(originalImage, 0, 0, width, height);
       
       // Convert to data URL with quality
       const quality = parseInt(qualitySlider.value) / 100;
       const dataURL = canvas.toDataURL('image/jpeg', quality);
       
       // Update preview
       previewImage.src = dataURL;
       
       // Calculate new size
       calculateNewSize(dataURL);
   }
   
   function calculateNewSize(dataURL) {
       // Approximate new size based on base64 string length
       // Each character in base64 represents 6 bits, so we divide by 8 to get bytes
       // We also subtract the dataURL header length
       const header = 'data:image/jpeg;base64,';
       const base64Length = dataURL.length - header.length;
       newSize = Math.round((base64Length * 6) / 8);
       
       // Update display
       newSizeEl.textContent = formatFileSize(newSize);
       
       // Calculate reduction percentage
       const reduction = ((originalSize - newSize) / originalSize) * 100;
       reductionPercentageEl.textContent = `${Math.round(reduction)}%`;
   }
   
   function resetValues() {
       if (originalImage) {
           widthInput.value = originalWidth;
           heightInput.value = originalHeight;
           qualitySlider.value = 80;
           qualityValue.textContent = '80%';
           
           updateImagePreview();
       }
   }
   
   function downloadImage() {
       if (!originalImage) return;
       
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
       
       // Set dimensions
       const width = parseInt(widthInput.value) || originalWidth;
       const height = parseInt(heightInput.value) || originalHeight;
       
       canvas.width = width;
       canvas.height = height;
       
       // Draw image with quality
       ctx.drawImage(originalImage, 0, 0, width, height);
       
       // Convert to data URL with quality
       const quality = parseInt(qualitySlider.value) / 100;
       const dataURL = canvas.toDataURL('image/jpeg', quality);
       
       // Create download link
       const link = document.createElement('a');
       link.download = 'resized-image.jpg';
       link.href = dataURL;
       link.click();
   }
   
   function formatFileSize(bytes) {
       if (bytes === 0) return '0 Bytes';
       
       const k = 1024;
       const sizes = ['Bytes', 'KB', 'MB', 'GB'];
       const i = Math.floor(Math.log(bytes) / Math.log(k));
       
       return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   }