function factoring(n, i = 2, res = []) {
    if(n === 1) return res
    if (n % i === 0) {
        n /= i
        res.push(i)
        i = 2
    }
    else i++
    return factoring(n, i, res)
}

console.log(factoring(18))

/* -------------------------------------------------------------------------- */
function sumIter(n) {
    let sum = 0;
    for(let i = 0; i <= n; i++) sum += i;
    return sum;
}

function sumRec(n) {
    if (n === 0) return 0;
    return n + sumRec(n - 1);
}

function sumRecTail(n, sum = n) {
    if (n === 1) return sum;
    return sumRecTail(n - 1, sum + n);
}

function sumRecClosure(n) {
    let sum = 0;
    let fn = () => {
        sum += n;
        n--;
        if(n === 0) return;
        fn();
    }
    fn();
    return sum;
}

function sumHeap(n, heap = { n: n, sum: 0 }) {
    heap.sum += heap.n;
    heap.n--;
    if(heap.n === 0) return heap.sum;
    return sumHeap(0, heap);
}

function* range(n) {
    for(let i = 0; i <= n; i++) yield i;
}

function sumDeclarativeNot(n) {
    let sum = 0;
    Array.from(range(n)).forEach(e => sum += e);
    return sum;
}

function sumDeclarative(n) {
    return Array.from(range(n)).reduce((sum, e) => sum + e, 0);
}

console.log(sumHeap(10));