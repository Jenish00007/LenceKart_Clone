const SectionBanner = require('../Models/sectionBanner');

// Get all section banners
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await SectionBanner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get banners by section
exports.getBannersBySection = async (req, res) => {
    try {
        const { section } = req.params;
        const banners = await SectionBanner.find({ section });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new section banner
exports.createBanner = async (req, res) => {
    try {
        const banner = new SectionBanner(req.body);
        const savedBanner = await banner.save();
        res.status(201).json(savedBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update section banner
exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBanner = await SectionBanner.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete section banner
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        await SectionBanner.findByIdAndDelete(id);
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 