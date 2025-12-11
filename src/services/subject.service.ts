import Subject from '../models/Subject';

interface SubjectInfo { 
    materia_name: string;
    materia_description?: string;
    materia_acronym?: string;
}

export const createSubject = async (data: SubjectInfo) => {
    return await Subject.create(data);
};

export const getAllSubjects = async () => {
    return await Subject.find();
};

export const getSubjectById = async (id: string) => {
    return await Subject.findById(id);
};

export const updateSubject = async (id: string, data: SubjectInfo) => {
    return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSubject = async (id: string) => {
    return await Subject.findByIdAndDelete(id);
};