const mongoose = require('mongoose');
const SectionBanner = require('../Models/sectionBanner');
const { connection } = require('../Configs/db');

const sectionBanners = [
  {
    title: "CONTACT LENSES & MORE",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "top"
  },
  {
    title: "GOLD MEMBERSHIP",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "top"
  },
  {
    title: "TRENDING EYEGLASSES",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "middle"
  },
  {
    title: "SUNGLASSES COLLECTION",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "middle"
  },
  {
    title: "COMPUTER GLASSES",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "bottom"
  },
  {
    title: "COLOR CONTACT LENSES",
    leftImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    rightImage: "https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif",
    section: "bottom"
  }
];

const seedSectionBanners = async () => {
  try {
    await connection;
    console.log('Connected to MongoDB');

    // Clear existing section banners
    await SectionBanner.deleteMany({});
    console.log('Cleared existing section banners');

    // Insert new section banners
    const insertedBanners = await SectionBanner.insertMany(sectionBanners);
    console.log('Successfully inserted section banners:', insertedBanners);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding section banners:', error);
    process.exit(1);
  }
};

seedSectionBanners(); 