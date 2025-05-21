const glassProduct = require("../../../Models/glassProducts");

class GlassProduct {
  static async filterGlassProduct(req, res) {
    try {
      const {
        masterCategory,
        personCategory,
        contactLensesDisposability,
        exploreByPower,
        lenseColor,
        lenseSolutions,
        lenseCollections,
        lensFeatures,
        lensMaterial,
        caption,
        productId,
        frameTypes,
        frameType,
        shapes,
        frameSize,
        frameWidth,
        weightGroup,
        dimension,
        style,
        colors,
        frameColors,
        gender,
        ageGroup,
        priceMin,
        priceMax,
        rating,
        trending,
        recommended,
        isNew,
        isBestSeller
      } = req.body;

      const { search, limit = 10, offset = 0 } = req.query;

      const query = {};

      if (masterCategory) query.masterCategory = masterCategory;
      if (personCategory) query.personCategory = personCategory;
      if (caption) query.caption = new RegExp(caption, "i");
      if (productId) query.productId = productId;
      if (frameTypes) query.frameTypes = frameTypes;
      if (frameType) query.frameType = frameType;
      if (shapes) query.shapes = shapes;
      if (frameSize) query.frameSize = frameSize;
      if (frameWidth) query.frameWidth = frameWidth;
      if (weightGroup) query.weightGroup = weightGroup;
      if (dimension) query.dimension = new RegExp(dimension, "i");
      if (style) query.style = style;
      if (colors) query.colors = { $in: [].concat(colors) };
      if (frameColors) query.frameColors = { $in: [].concat(frameColors) };
      if (gender) query.gender = gender;
      if (ageGroup) query.ageGroup = ageGroup;

      if (priceMin || priceMax) {
        query.priceCategory = {};
        if (priceMin) query.priceCategory.$gte = Number(priceMin);
        if (priceMax) query.priceCategory.$lte = Number(priceMax);
      }

      if (rating) query.rating = { $gte: parseFloat(rating) };
      if (trending !== undefined) query.trending = trending === true || trending === "true";
      if (recommended !== undefined) query.recommended = recommended === true || recommended === "true";
      if (isNew !== undefined) query.isNew = isNew === true || isNew === "true";
      if (isBestSeller !== undefined) query.isBestSeller = isBestSeller === true || isBestSeller === "true";

      if (masterCategory === "Contact Lenses") {
        if (contactLensesDisposability) query.contactLensesDisposability = contactLensesDisposability;
        if (exploreByPower) query.exploreByPower = exploreByPower;
        if (lenseColor) query.lenseColor = lenseColor;
        if (lenseSolutions) query.lenseSolutions = lenseSolutions;
        if (lenseCollections) query.lenseCollections = lenseCollections;
        if (lensFeatures) query.lensFeatures = { $in: [].concat(lensFeatures) };
        if (lensMaterial) query.lensMaterial = lensMaterial;
      }

      if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [
          { caption: regex },
          { productId: regex },
          { dimension: regex }
        ];
      }

      const excludedContactFields = {
        contactLensesDisposability: 0,
        exploreByPower: 0,
        lenseColor: 0,
        lenseSolutions: 0,
        lenseCollections: 0,
        lensFeatures: 0,
        lensMaterial: 0
      };

      const projection =
        masterCategory &&
        ["Eyeglasses", "Computer Glasses", "Sunglasses", "Kids Glasses"].includes(masterCategory)
          ? excludedContactFields
          : {};

      const getGlassProducts = await glassProduct
        .find(query, projection)
        .sort({ rating: -1, createdAt: -1 })
        .skip(Number(offset))
        .limit(Number(limit))
        .lean();

      return res.status(200).json({
        status: true,
        count: getGlassProducts.length,
        data: getGlassProducts
      });
    } catch (errors) {
      console.log("Error in the glass product filter:", errors);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: errors.message
      });
    }
  }
}

module.exports = GlassProduct;
