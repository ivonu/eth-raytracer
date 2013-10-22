// Random Log function
console.rlog_start = function() {
    this.rlogging = (Math.random() < 0.001);
}
console.rlog = function (msg) {
    if (this.rlogging) {
        console.log(msg);
    }
}
console.rlog_end = function() {
    this.rlogging = false;
}