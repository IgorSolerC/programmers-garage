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

export function RandomInteger(pMin = 1, pMax = 1_000_000_000){
    pMin = Math.round(pMin);
    pMax = Math.round(pMax);
    if (pMax < pMin) { let t = pMin; pMin = pMax; pMax = t;}
    return Math.floor(Math.random() * (pMax+1 - pMin) + pMin);
}