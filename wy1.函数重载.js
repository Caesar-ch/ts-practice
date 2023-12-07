function hello(name) { }
function hello(name) {
    if (typeof name === 'string') {
        return name + '1';
    }
    else if (typeof name === 'number') {
        return name + 1;
    }
}
hello('1');
hello(true);
