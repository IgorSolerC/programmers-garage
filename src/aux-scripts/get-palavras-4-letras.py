import os

def main():
    PATH = os.getcwd()
    QTD_LETRAS = 5

    # Get file
    with open(PATH+"\\aux-scripts\\br-sem-acentos.txt", "r") as f:
        lines = f.readlines()

    # Tratamento Inicial
    lines = [x.replace('\n', "") for x in lines]
    # Filtra por tramanho (E remove nomes proprios)
    filtrado = [word.upper() for word in lines if len(word) == QTD_LETRAS and not any(letra.isupper() for letra in word)]

    # Salva arquivo
    NEW_PATH = '\\'.join(PATH.split('\\')[:-1]) + '\\public\\possible-words.txt'
    try:
        os.remove(NEW_PATH)
    except Exception as e:
        print(e)
        
    with open(NEW_PATH, "w+") as f:
        f.write(",".join(filtrado))

    print("Saved!")

if __name__ == "__main__":
    main()

