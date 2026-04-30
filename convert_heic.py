import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

directory = "public/assets/Slide10"

for filename in os.listdir(directory):
    if filename.lower().endswith(".heic"):
        filepath = os.path.join(directory, filename)
        try:
            image = Image.open(filepath)
            new_filename = filename[:-5] + ".JPG"
            new_filepath = os.path.join(directory, new_filename)
            image.save(new_filepath, "JPEG", quality=90)
            print(f"Converted {filename} to {new_filename}")
            # delete original
            os.remove(filepath)
            print(f"Deleted original {filename}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")
