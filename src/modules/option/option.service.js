import Option from '../../models/Option.js';

export async function createOption(data) {
  try {
    const newOption = new Option(data);
    return await newOption.save();
  } catch (error) {
    throw new Error('Error creating Option: ' + error.message);
  }
}

export async function getAllOptions() {
  try {
    return await Option.find();
  } catch (error) {
    throw new Error('Error fetching Options: ' + error.message);
  }
}

export async function getOptionById(id) {
  try {
    return await Option.findById(id);
  } catch (error) {
    throw new Error('Error fetching Option: ' + error.message);
  }
}

export async function updateOption(id, updateData) {
  try {
    return await Option.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating Option: ' + error.message);
  }
}

export async function deleteOption(id) {
  try {
    return await Option.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting Option: ' + error.message);
  }
}
