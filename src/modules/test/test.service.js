import Test from '../../models/Test.js';

export async function createTest(testData) {
  try {
    const newTest = new Test(testData);
    const savedTest = await newTest.save();
    return savedTest;
  } catch (error) {
    throw new Error('Error creating test: ' + error.message);
  }
}

export async function getAllTests() {
  try {
    return await Test.find().populate('id_user', 'username email'); 
  } catch (error) {
    throw new Error('Error fetching tests: ' + error.message);
  }
}

export async function getTestById(id) {
  try {
    return await Test.findById(id).populate('id_user', 'username email');
  } catch (error) {
    throw new Error('Error fetching test: ' + error.message);
  }
}

export async function updateTest(id, updateData) {
  try {
    return await Test.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating test: ' + error.message);
  }
}

export async function deleteTest(id) {
  try {
    return await Test.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting test: ' + error.message);
  }
}
