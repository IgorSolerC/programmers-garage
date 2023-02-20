export function IsLetter(key) {
    return /^[a-zA-Z]$/.test(key);
}

export function Mod(n, m){
    return (n % m + m) % m
}

export function MakeMatriz(nrows, ncols, val){
    let row = new Array(ncols); for (let i=0; i<row.length; ++i) row[i] = val;
    let matriz = new Array(nrows); for (let i=0; i<matriz.length; ++i) matriz[i] = [...row];
    return matriz
}