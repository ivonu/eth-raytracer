// Random Log function
console.rlog = function (msg) {
    if (Math.random() > 0.001) return;
    console.log(msg);
}