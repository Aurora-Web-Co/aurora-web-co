module.exports = {
    name: "Aurora Web Co",
    email: "lewismunro@aurorawebco.com",
    phoneForTel: "",
    phoneFormatted: "",
    address: {
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        mapLink: "",
    },
    socials: {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.aurorawebco.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
