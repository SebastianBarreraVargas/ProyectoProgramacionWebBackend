import Area from '../models/Area';

interface AreaInfo { 
    nom_areat: string;
    desc_area?: string;
    sigla?: string;
    id_materia: string;
}

export const createArea = async (data: AreaInfo) => {
    return await Area.create(data);
};

export const getAllAreas = async () => {
    return await Area.find().populate('id_materia');
};

export const getAreaById = async (id: string) => {
    return await Area.findById(id).populate('id_materia');
};

export const getAreaByMateria = async (id_materia: string) => {
    return await Area.findOne({ id_materia }).populate('id_materia');
};

export const updateArea = async (id: string, data: AreaInfo) => {
    return await Area.findByIdAndUpdate(id, data, { new: true }).populate('id_materia');
};

export const deleteArea = async (id: string) => {
    return await Area.findByIdAndDelete(id);
};