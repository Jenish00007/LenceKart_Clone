const AdBanner = require('../Models/AdBanner');

// Get all active ad banners
exports.getAdBanners = async (req, res) => {
  try {
    const banners = await AdBanner.find({ isActive: true }).sort({ position: 1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad banners', error: error.message });
  }
};

// Create a new ad banner
exports.createAdBanner = async (req, res) => {
  try {
    const { imageUrl, altText, position } = req.body;
    const newBanner = new AdBanner({
      imageUrl,
      altText,
      position
    });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ad banner', error: error.message });
  }
};

// Update an ad banner
exports.updateAdBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBanner = await AdBanner.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedBanner) {
      return res.status(404).json({ message: 'Ad banner not found' });
    }
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ad banner', error: error.message });
  }
};

// Delete an ad banner
exports.deleteAdBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await AdBanner.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({ message: 'Ad banner not found' });
    }
    res.status(200).json({ message: 'Ad banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ad banner', error: error.message });
  }
}; 