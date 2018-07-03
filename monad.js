const Maybe = {
    of: (x) => {
        const isNothing = () => (x === null) || (x === undefined);
        return {
            map: (f) => {
                if (isNothing()) return Maybe.of(null);
                return Maybe.of(f(x))
            },
            chain: (f) => f(x)
        };
    },
};

module.exports = Maybe;
