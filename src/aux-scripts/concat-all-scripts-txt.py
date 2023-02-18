import os
from time import sleep # Debug Only

def get_files(path, concat): # Get all .js and .css files text (recursive)
    listdir = os.listdir(path)
    EXTENSIONS = ['.js', '.css', '.py']
    IGNORE = ['reportWebVitals.js', 'setupTests.js']
    for file_nm in listdir:
        f_path = path+'\\'+file_nm
        # Se não for "ignore" e possuir extensão wanted
        if file_nm not in IGNORE and any([file_nm.endswith(x) for x in EXTENSIONS]):
            with open(f_path, 'rb') as f:
                file_txt = f.read().decode("utf-8")       # Read file content
                file_txt = f'/* {file_nm} */\n{file_txt}' # Add file_nm title
                concat.append(file_txt)                   # Add file content to file_content array
        # Se for um diretorio
        elif(os.path.isdir(f_path)):
            # Get all files deste diretorio
            get_files(f_path, concat)

def main():
    PATH = os.getcwd()
    
    concat = []
    get_files(PATH, concat)
    concat = '\n\n'.join(concat)
    with open(PATH+'\\..\\public\\all-scripts.txt', "w+") as f:
        f.write(concat)
    

if __name__ == '__main__':
    main()