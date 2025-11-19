import AgeClassification from "../../models/AgeClassification.js";

export const createAgeClassification = async (data) => {
    return await AgeClassification.create(data);
};

export const getAllAgeClassifications = async () => {
    return await AgeClassification.find();
};

export const getAgeClassificationById = async (id) => {
    return await AgeClassification.findById(id);
};

export const updateAgeClassification = async (id, data) => {
    return await AgeClassification.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAgeClassification = async (id) => {
    return await AgeClassification.findByIdAndDelete(id);
};
