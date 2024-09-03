const categoryModels = require("../models/categoryModels");

const AddCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Please provide all details.",
      });
    }

    const newCategory = new categoryModels({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category added successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in add category API.",
      error,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }
    res.status(200).send({
      data: category,
      success: true,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get all category API.",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const { id } = req.params;
    const updateCategory = await categoryModels.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(404).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      message: "Category updated sucessfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in update category API.",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = await categoryModels.findByIdAndDelete({ _id: id });
    if (!updateCategory) {
      return res.status(404).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      message: "Category deleted sucessfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in delete category API.",
      error,
    });
  }
};

module.exports = {
  AddCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
