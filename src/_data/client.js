module.exports = {
    name: "East Lothian Web Design",
    email: "eastlothianwebdesign@gmail.com",
    phoneForTel: "+447713848758",
    phoneFormatted: "(+44) 7713848758",
    address: {
        lineOne: "Golf Cottage, 36",
        lineTwo: "Main Street",
        city: "Gullane",
        state: "East Lothian",
        zip: "EH31 2AA",
        country: "UK",
        mapLink: "",
    },
    socials: {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.example.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
