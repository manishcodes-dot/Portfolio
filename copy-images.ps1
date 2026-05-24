$srcDir = "C:\Users\ACER\.gemini\antigravity\brain\c978b248-fe51-421e-8cc3-1a2c64b24f3f"
$destDir = "c:\Users\ACER\Documents\Meantime Portfilio\real protfilio\Resources"

Copy-Item "$srcDir\project_hero_laptop_1779601458070.png" -Destination "$destDir\hero-laptop.png" -Force
Copy-Item "$srcDir\project_1_1779601473793.png" -Destination "$destDir\project-1.png" -Force
Copy-Item "$srcDir\project_2_1779601487854.png" -Destination "$destDir\project-2.png" -Force
Copy-Item "$srcDir\hero_bg_1779601505228.png" -Destination "$destDir\hero-bg.png" -Force
Copy-Item "$srcDir\project_3_1779601523738.png" -Destination "$destDir\project-3.png" -Force
Copy-Item "$srcDir\about_image_1779601539091.png" -Destination "$destDir\about-image.png" -Force

Write-Host "All 6 images copied successfully to Resources folder!"
