const Maybe = require('./monad.js');

var user = {
    email: 'james@example.com',
    accountDetails: {
        address: {
            street:   '123 Fake St',
            city:     'Exampleville',
            province: 'NS',
            postcode: '1234'
        }
    },
    preferences: {}
}

var banners = {
    'AB': '/assets/banners/alberta.jpg',
    'BC': '/assets/banners/british-columbia.jpg',
    'MB': '/assets/banners/manitoba.jpg',
    'NL': '/assets/banners/newfoundland-labrador.jpg',
    'NS': '/assets/banners/nova-scotia.jpg',
    'NT': '/assets/banners/northwest-territories.jpg',
    'ON': '/assets/banners/ontario.jpg',
    'PE': '/assets/banners/prince-edward.jpg',
    'QC': '/assets/banners/quebec.jpg',
    'SK': '/assets/banners/saskatchewan.jpg',
    'YT': '/assets/banners/yukon.jpg',
};

// const getUserBanner = (user, banners) => {
//     return banners[user.accountDetails.address.province];
// };

// console.log(getUserBanner(user, banners));

const prop = (p) => (u) => u[p];
const getBannerUrl = (banners) => (province) => banners[province];
const setBannerUrl = (prolog) => (src) => { console.log(prolog + src); }

const getUserBanner2 = (user, banners) => {
    return Maybe.of(user)
        .map(prop('accountDetails'))
        .map(prop('address'))
        .map(prop('province'))
        .map(getBannerUrl(banners))
        .map(setBannerUrl('Finally setting the banner source to: '));
};

getUserBanner2(user, banners);

const getBannerUrlSafe = (banners) => (province) => Maybe.of(banners[province]);
const propSafe = (p) => (u) => Maybe.of(u[p]);

const getUserBannerWithChain = (user, banners) => {
    return Maybe.of(user)
        .chain(propSafe('accountDetails'))
        .chain(propSafe('address'))
        .chain(propSafe('province'))
        .chain(getBannerUrlSafe(banners))
        .map(setBannerUrl('Finally setting the banner source to: '));
};

getUserBannerWithChain(user, banners);

const errorUser = null;
getUserBanner2(errorUser, banners);
const unknownUser = {};
getUserBanner2(unknownUser, banners);
const unknownAddress = {
    email: 'james@example.com',
    accountDetails: {
        address: {}
    },
    preferences: {}
};
getUserBanner2(unknownAddress, banners);
