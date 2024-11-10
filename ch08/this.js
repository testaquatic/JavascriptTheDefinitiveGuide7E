let o = {
    m: function () {
        let self = this;
        this == o;
        f();

        function f() {
            this == 0;
            self == 0;
        }
    },
};

o.m();
