import AgeClassification from '../models/AgeClassification';

export const createAgeClassification = async (data: string) => {
    return await AgeClassification.create(data);
};

export const getAllAgeClassifications = async () => {
    return await AgeClassification.find();
};

export const getAgeClassificationById = async (id: string) => {
    return await AgeClassification.findById(id);
};

interface AgeClassificationInfo { 
    desc_classification: string,
    starting_age: number,
    ending_age: number 
}

export const updateAgeClassification = async (id: string, data: AgeClassificationInfo) => {
    return await AgeClassification.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAgeClassification = async (id: string) => {
    return await AgeClassification.findByIdAndDelete(id);
};